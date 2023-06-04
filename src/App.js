import axios from 'axios';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [chosenSearch, setChosenSearch] = useState(null);
  const [chosenType, setChosenType] = useState(null);
  const [chosenRatingRange, setChosenRatingRange] = useState(null);
  const [chosenSortOption, setchosenSortOption] = useState(null);
  const [documents, setDocuments] = useState(null);

  const sendSearchRequest = () => {
    const results = {
      method: 'GET',
      url: 'http://localhost:3001/results',
      params: {
        search: chosenSearch,
        type: chosenType,
        rating: chosenRatingRange, 
        sortOption: chosenSortOption
      },
    };
    axios
      .request(results)
      .then((response) => {
        console.log(response.data);
        setDocuments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='app'>
      <nav>
        <ul className='nav-bar'>
          <li>Attractions</li>
        </ul>
      </nav>
      <p className='directions'>
        {' '}
        Search for earthquakes using the following criteria:
      </p>
      <div className='main'>
        <div className='type-selector'>
          <ul>
            <li>
              <form>
                <label>
                  <input
                    className='form'
                    type='text'
                    placeholder='Search for anything!'
                    value={chosenSearch}
                    onChange={(e) => setChosenSearch(e.target.value)}
                  />
                </label>
              </form>
            </li>
            <li>
              <select
                name='types'
                id='types'
                value={chosenType}
                onChange={(e) => setChosenType(e.target.value)}
              >
                <option value={null}>Select a Type</option>
                <option value='Nature & Wildlife'>Nature & Wildlife</option>
                <option value='Leisure & Recreation'>Leisure & Recreation</option>
                <option value='Adventure'>Adventure</option>
                <option value='History & Culture'>History & Culture</option>
                <option value='Arts'>Arts</option>
                <option value='Others'>Others</option>
              </select>
            </li>
            <li>
              <select
                name='ratingRange'
                id='ratingRange'
                value={chosenRatingRange}
                onChange={(e) => setChosenRatingRange(e.target.value)}
              >
                <option value={null}>Ratings Above</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
            </li>
            {/* <li>
              <form>
                <label>
                  <input
                    className='form'
                    type='text'
                    placeholder='Enter city, state, country'
                    value={chosenLocation}
                    onChange={(e) => setChosenLocation(e.target.value)}
                  />
                </label>
              </form>
            </li> */}
            <li>
              <select
                name='sortOption'
                id='sortOption'
                value={chosenSortOption}
                onChange={(e) => setchosenSortOption(e.target.value)}
              >
                <option value={null}>Sort by</option>
                <option value='desc'>Highest Rating First</option>
                <option value='asc'>Lowest Rating First</option>
              </select>
            </li>
            <li>
              <button onClick={sendSearchRequest}>Search</button>
            </li>
          </ul>
        </div>
        {documents && (
          <div className='search-results'>
            {documents.length > 0 ? (
              <p class="ml-5 text-white"> Number of hits: {documents.length}</p>
            ) : (
              <p class="ml-5 text-white"> No results found. Try broadening your search criteria.</p>
            )}
            <div className="row">
                {documents.map((document) => (
                  <div className="col-md-4">
                  <div class="card m-1" style={{width: '25rem', height: '15rem'}}>
                    <div class="card-body">
                      <h5 class="card-title">{document._source.name}<span class="badge rounded-pill text-bg-success ms-4">{document._source.rating}</span></h5>
                      <span class="badge text-bg-primary">{document._source.type}</span>
                      <p class="card-text">Tags: {document._source.tags}</p>
                      <p>Address: {document._source.block} {document._source.streetName} {document._source.floorNumber} {document._source.unitNumber} {document._source.buildingName} {document._source.postalCode}</p>
                      <p>Official Site: {document._source.officialWebsite}</p>
                    </div>
                  </div>
                  </div>
                //   <div className='results-card'>
                //     <div className='results-text'>
                //       <p>Rating: {document._source.rating}</p>
                //       <p>Address: {document._source.block} {document._source.streetName} {document._source.floorNumber} {document._source.unitNumber} {document._source.buildingName} {document._source.postalCode}</p>
                //       <p>Official Site: {document._source.officialWebsite}</p>
                //     </div>
                //   </div>
                ))}
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
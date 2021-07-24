const Shelves = () => {
  return (
    <div className='d-flex container'>
      <div id='left-panel' className='col-3'>
        <div>ALL SHELVES</div>
      </div>
      <div id='right-panel' className='col-9'>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Cover</th>
              <th scope='col'>Title</th>
              <th scope='col'>Author(s)</th>
              <th scope='col'>Avg. rating</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Shelves;

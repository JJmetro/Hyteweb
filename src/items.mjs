// mock data for simple API
const items = [
    {id: 1, name: 'Item 1'},
    {id: 2, name: 'Item 2'},
    {id: 3, name: 'Item kolme'},
    {id: 4, name: 'Item neljä'},
  ];

  const getItems = (req, res) => {
    res.json(items);
  };

 const getItembyId = (req, res) => {
    // TODO: palauta vain se objekti, jonka id vastaa pyydettyä
    const requestedItemId = +req.params.id;
    const item = items.find(item => item.id == requestedItemId);

    if (item) {
      res.json(item);
    } else {
      res.status(404).json({error: 'Item not found'});
    }
  };

  const postItem = (req, res) => {
    // TODO (vapaaehtonen, jatketaan tästä ens kerralla): lisää postattu item items-taulukkoon
      res.json({message: 'item created'});
    };

    const deleteItem = (req, res) => {
        res.json({message: 'delete placeholder'});
    };

    const putItem = (req, res) => {
        res.json({message: 'put placeholder'});
    };

  export {getItems, getItembyId, postItem, deleteItem, putItem}


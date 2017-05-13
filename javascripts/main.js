console.log("shrroooomms");

//FIREBASE PROMISE FUNCTION

app.controller("ItemCtrl", ($http, $q, $scope, FIREBASE_CONFIG) => {


let getItemList = () => {
  let itemz = [];
  return $q((resolve, reject) => {
    $http.get(`${FIREBASE_CONFIG.databaseURL}/items.json`)
    .then((fbItems) => {
        let itemCollection = fbItems.data;
        Object.keys(itemCollection).forEach((key) => {
          itemCollection[key].id=key;
          itemz.push(itemCollection[key]);
        });
        resolve(itemz);
      resolve(fbItems);
    }).catch((error) => {
      reject(error);
    });
  });

};

  let getItems = () => {
    getItemList().then((itemz) => {
      // $scope.items = itemz;
      console.log("itemz", itemz);
    }).catch((error) => {
      console.log("get error", error);
    });
  };

  getItems();

  let postNewItem = (newItem) => {
    return $q((resolve, reject) => {
      $http.post(`${FIREBASE_CONFIG.databaseURL}/items.json`, JSON.stringify(newItem))
      .then((resultz) => {
        resolve(resultz);
      }).catch((error) => {
        reject(error);
      });
    });
  };


});

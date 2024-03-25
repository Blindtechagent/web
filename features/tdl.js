    // todo input container
    const inputContainer = document.querySelector(".todo-input");
    const showInputAction = inputContainer.querySelector(".show-input-action");
    const todoForm = inputContainer.querySelector(".todo-form");
    const inputTodo = todoForm.querySelector("#input-todo");
    const todoButton = todoForm.querySelector("#todo-button");

    // todo list container
    const listContainer = document.querySelector(".todo-lists");
    const showResultAction = listContainer.querySelector(".show-result-action");
    const unOrderList = listContainer.querySelector(".ul-list");
    const clearButton = listContainer.querySelector("#reset-button");

    // all function here
    // loadDataFromLocalStorage function here
    const loadDataFromLocalStorage = () => {
      //get data from localStorage
      let todoArray = getDataFromLocalStorage();

      // create item list from data
      createListElementShow(todoArray);
    };

    // showSuccessfullAlert function
    const showActionAlert = (text, signal, element) => {
      element.textContent = text;
      element.classList.add(`show-alert-${signal}`);
      inputTodo.value = "";

      // removing actionAlert message
      setTimeout(() => {
        element.classList.remove(`show-alert-${signal}`);
      }, 1500);
    };

    // checkDataValidity function
    const checkDataValidity = (event) => {
      event.preventDefault();
      let todoValue = inputTodo.value;

      //checking user enter valid data and take action
      if (todoValue) {
        putDataInLocalStorage(todoValue);
        showActionAlert(`${todoValue} is successfully added`, "green", showInputAction);

      } else {
        showActionAlert("please enter a todo", "red", showInputAction);
      }
    };

    // getDataFromLocalStorage function
    const getDataFromLocalStorage = () => {
      let todoArray, exist;

      exist = localStorage.getItem("todoArray");
      todoArray = exist === null ? [] : JSON.parse(exist);

      return todoArray;
    };

    // putDataInLocalStorage function
    const putDataInLocalStorage = (todoValue) => {
      let uniqueId, arryData, todoArray, serial;

      // calling getDataFromLocalStorage function
      todoArray = getDataFromLocalStorage();

      // generating a unique id for every todo list
      uniqueId = Date.now().toString();

      // making array data for pushing
      arryData = { id: uniqueId, value: todoValue };

      // pushing array data on todoArray
      todoArray.push(arryData);

      // make serial for giving serial every list of todo
      serial = todoArray.length;

      // showing data in todo list
      createListElement(arryData, serial);

      // updated data again set in localStorage
      setDataInLocalStorage(todoArray);
    };

    // setDataInLocalStorage function
    const setDataInLocalStorage = (todoArray) => {
      // make stringify the todoArray for storing
      let storableData = JSON.stringify(todoArray);

      // store todoArray in localStorage
      localStorage.setItem("todoArray", storableData);
    };

    // createListElement function
    const createListElement = (arryData, serial) => {
      let uniqueId, value;
      uniqueId = arryData.id;
      value = arryData.value;

      // creating element
      const list = document.createElement("li");
      list.id = uniqueId;
      const element = `<p>${serial} :</p> <p>${value}</p> <p id="single-delete"><img  src="./icon/icons8-trash-30.png" alt="Delete" /></p>`;

      // put element with list
      list.innerHTML = element;

      // append list with unOrderList
      unOrderList.appendChild(list);

      // singleListDelete
      const singleListDelete = list.querySelector("#single-delete");
      singleListDelete.addEventListener("click", deleteSingleItem);
    };

    // deleteSingleItem function
    const deleteSingleItem = (event) => {
      let todoArray, position, previousItem;

      // some necessary dom selecting
      const selectedList = event.target.parentElement.parentElement;
      const value = event.target.parentElement.previousElementSibling.innerText;
      const id = selectedList.id;

      //removing selected item
      unOrderList.removeChild(selectedList);

      // show an adding data action
      showActionAlert(`${value} is removed successfully`, "green", showResultAction);

      // get array from localStorage
      todoArray = getDataFromLocalStorage();

      // finding deleted item index
      position = todoArray.findIndex((object) => {
        return object.id === id;
      });

      // taking previous item
      previousItem = todoArray.filter((value, index) => {
        return index > position;
      });

      // also finding next elements
      todoArray = todoArray.filter((value, index) => {
        return index < position;
      });

      // pushing next elements value on todoArray
      previousItem.forEach((value) => {
        todoArray.push(value);
      });

      // update localStorage when delete a single item
      setDataInLocalStorage(todoArray);
      // take a reload for making serial correct
      setTimeout(() => {
        location.reload();
      }, 2000);
    };

    // createListElement function
    const createListElementShow = (todoArray) => {
      let arryData, serial;

      // create new list item when user add data or load window
      todoArray.forEach((value, index, array) => {
        arryData = value;
        serial = index + 1;
        createListElement(arryData, serial);
      });
    };

    // clearAllListItem function
    const clearAllListItem = () => {
      let len = getDataFromLocalStorage().length;

      if (len !== 0) {
        // take a confirmation from user
        let descition = confirm("Are You Sure To Delete All Todo ?");

        // take action which given by user
        if (descition) {
          // remove all item from current window
          unOrderList.textContent = "";

          // also remove from localStorage
          localStorage.removeItem("todoArray");
          showActionAlert("all items are successfully deleted", "red", showResultAction);

        } else {
          showActionAlert("items are not deleted", "green", showResultAction);
        }

      } else {
        showActionAlert("no more item to delete", "red", showResultAction);
      }
    };

    // all event listener
    // load event listener
    document.addEventListener("DOMContentLoaded", loadDataFromLocalStorage);

    // form event listener
    todoForm.addEventListener("submit", checkDataValidity);

    //clear all button listener
    clearButton.addEventListener("click", clearAllListItem);


    // event listener for styling button
    todoButton.addEventListener("mousedown", () => {
      todoButton.classList.add("scaling");
    });

    todoButton.addEventListener("mouseup", () => {
      todoButton.classList.remove("scaling");
    });

    clearButton.addEventListener("mousedown", () => {
      clearButton.classList.add("scaling");
    });

    clearButton.addEventListener("mouseup", () => {
      clearButton.classList.remove("scaling");
    });



    // happy coding !!!!!!
    // this project made by Fahad at 30 & 31 March, 2022
  
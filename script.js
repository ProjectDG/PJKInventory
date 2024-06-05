fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(mainSections => {
    let backToSection = "";
    let backToCategory = "";
    let currentBrands = [];

    $(document).ready(function() {
      function consoleFunc() {
        console.clear();
        $("#buttonContainer").empty();
        console.log("----- My Inventory App -----");
      }

      consoleFunc();
      console.log("----- Please Select a Section -----");

      function createContainer() {
        const main = document.getElementById("main");
        const buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("id", "buttonContainer");
        main.append(buttonContainer);
      }

      function createSectionButtons() {
        const buttonContainer = document.getElementById("buttonContainer");
        mainSections.forEach(x => {
          console.log(x.type);
          let newButton = document.createElement("button");
          newButton.setAttribute("id", x.type);
          newButton.setAttribute("class", "all-buttons section-buttons");
          newButton.innerText = x.type;
          buttonContainer.append(newButton);
        });
      }

      function createCategoryButtons(sectionType) {
        const buttonContainer = document.getElementById("buttonContainer");
        mainSections.forEach(x => {
          if (x.type === sectionType) {
            let sections = x.sections;
            sections.forEach(y => {
              let newButton = document.createElement("button");
              newButton.setAttribute("id", y.category);
              newButton.setAttribute("class", "all-buttons category-buttons");
              newButton.innerText = y.category;
              buttonContainer.append(newButton);
              console.log(y.category);
            });
          }
        });
      }

      function createBrandButtons(category) {
        const buttonContainer = document.getElementById("buttonContainer");
        mainSections.forEach(x => {
          x.sections.forEach(y => {
            if (y.category === category) {
              let brands = y.brands;
              currentBrands = brands; // Store the current brands
              brands.forEach(i => {
                let newButton = document.createElement("button");
                newButton.setAttribute("id", i.name);
                newButton.setAttribute("class", "all-buttons brand-buttons");
                newButton.innerText = i.name;
                buttonContainer.append(newButton);
                console.log(i.name);
              });
            }
          });
        });
      }

      function createBackButton(id, text, onClickFunction) {
        let backButton = document.getElementById(id);
        if (!backButton) {
          backButton = document.createElement("button");
          backButton.setAttribute("id", id);
          backButton.setAttribute("class", "all-buttons");
          backButton.innerText = text;
          backButton.addEventListener("click", onClickFunction);
          const main = document.getElementById("main");
          main.appendChild(backButton);
        } else {
          backButton.innerText = text;
          backButton.onclick = onClickFunction;
        }
      }

      function removeBackButton(id) {
        const backButton = document.getElementById(id);
        if (backButton) {
          backButton.remove();
        }
      }

      function backToSectionFunction() {
        consoleFunc();
        console.log("----- Please Select a Section -----");
        createSectionButtons();
        removeBackButton("mainBackButton");
        removeBackButton("backToBrandsButton");
        removeBackButton("backButton");
      }

      function backToCategoryFunction() {
        consoleFunc();
        console.log("----- Please Select a Category -----");
        createCategoryButtons(backToSection);
        createBackButton("mainBackButton", "Main", backToSectionFunction);
        removeBackButton("backToBrandsButton");
        removeBackButton("backButton");
      }

      function mainButtonFunction() {
        consoleFunc();
        console.log("----- Please Select a Section -----");
        createSectionButtons();
        removeBackButton("backToBrandsButton");
        removeBackButton("backButton");
        removeBackButton("mainBackButton");
      }

      function backToBrandsFunction() {
        consoleFunc();
        console.log("----- Please Select a Brand -----");
        const buttonContainer = document.getElementById("buttonContainer");
        currentBrands.forEach(i => {
          let newButton = document.createElement("button");
          newButton.setAttribute("id", i.name);
          newButton.setAttribute("class", "all-buttons brand-buttons");
          newButton.innerText = i.name;
          buttonContainer.append(newButton);
        });
        createBackButton("mainBackButton", "Main", mainButtonFunction);
        createBackButton("backButton", `Back To ${backToSection}`, backToCategoryFunction);
        removeBackButton("backToBrandsButton");
      }

      createContainer();
      createSectionButtons();

      $(document).on("click", ".section-buttons", function() {
        consoleFunc();
        console.log("----- Please Select a Category -----");
        createCategoryButtons(this.id);
        createBackButton("mainBackButton", "Main", mainButtonFunction);
        backToSection = this.id;
      });

      $(document).on("click", ".category-buttons", function() {
        consoleFunc();
        console.log("----- Please Select a Brand -----");
        createBrandButtons(this.id);
        createBackButton("mainBackButton", "Main", mainButtonFunction);
        createBackButton("backButton", `Back To ${backToSection}`, backToCategoryFunction);
        backToCategory = this.id;
      });

      $(document).on("click", ".brand-buttons", function() {
        consoleFunc();
        removeBackButton("backButton"); // Remove the back to category button
        createBackButton("mainBackButton", "Main", mainButtonFunction);
        createBackButton("backToBrandsButton", "Back To Brands", backToBrandsFunction);
      });

    });
  })
  .catch(error => {
    console.error('There was a problem fetching the mainSections:', error);
  });

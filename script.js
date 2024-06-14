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
        const backButtonDiv = document.getElementById("backButtonDiv");
        let backButton = document.getElementById(id);
        if (!backButton) {
          backButton = document.createElement("button");
          backButton.setAttribute("id", id);
          backButton.setAttribute("class", "all-buttons back-buttons");
          backButton.innerText = text;
          backButton.addEventListener("click", onClickFunction);
          if (!backButtonDiv) {
            const main = document.getElementById("main");
            const newBackButtonDiv = document.createElement("div");
            newBackButtonDiv.setAttribute("id", "backButtonDiv");
            main.appendChild(newBackButtonDiv);
            newBackButtonDiv.appendChild(backButton);
          } else {
            backButtonDiv.appendChild(backButton);
          }
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
        const backButtonDiv = document.getElementById("backButtonDiv");
        if (backButtonDiv && backButtonDiv.children.length === 0) {
          backButtonDiv.remove();
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

      function createDiv(id, section){
        let buttonContainer = document.getElementById("buttonContainer");
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", id);
        newDiv.setAttribute("class", section);
        buttonContainer.appendChild(newDiv);
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
        createDiv("photoDiv", "info-section");
        createDiv("titleDiv", "info-section");
        createDiv("infoDiv", "info-section");

        let photoLink = "";
        let photoTitle = ""; 

        mainSections.forEach(x => {
          if(x.type === backToSection){
            let sections = x.sections;
            sections.forEach(y => {
              if(y.category === backToCategory){
                let brands = y.brands;
                brands.forEach(i => {
                  if(this.id === i.name){
                    console.log("Description of " + i.name + ":");
                    // console.log(this.id);
                    photoLink = i.photo
                    photoTitle = i.name

                    let infoArr = 0;

                    if(i.sectionNames === null || i.sectionNames === undefined){
                      return;
                    } else {
                      i.sectionNames.forEach(n => {
                        // console.log(n);
                        let sectionTitle = n;
                        let forID = sectionTitle.replace(/\s/g, '');
                        let infoDiv = document.getElementById("infoDiv");
                        let sectionDiv = document.createElement("div");
                        sectionDiv.setAttribute("id", forID);
                        sectionDiv.setAttribute("class", "sections");
                        sectionDiv.innerText = sectionTitle;


                        let sectionInfo = document.createElement("div");
                        sectionInfo.innerText = i.sectionInfo[infoArr][0];   // On to something here ..........................
                        sectionInfo.setAttribute("id", forID + "Section");
                        sectionInfo.setAttribute("class", "info");
                        
                        
                        // i.sectionInfo.forEach(e => {
                        //   let check = Array.isArray(e);
                        //   if(check === true){
                        //     e.forEach(m => {
                        //       console.log(m);
                        //     })
                        //   }
                        // })
                        

                        infoArr = infoArr + 1;


                        infoDiv.append(sectionDiv);
                        infoDiv.append(sectionInfo);
                        })
                      } 
                  }
                })
              }
            })
          }
        })
        
        let photo = document.createElement("img");                
        photo.setAttribute("src", photoLink);
        let photoDiv = document.getElementById("photoDiv");
        photoDiv.appendChild(photo);

        let title = document.createElement("h1");
        title.setAttribute("id", "photoTitle");
        title.innerText = photoTitle;
        let titleDiv = document.getElementById("titleDiv");
        titleDiv.appendChild(title);
 

      });

      $(document).on("click", ".sections", function() {
        let newID = "#" + this.id + "Section";
        $(newID).toggle();
      });

    });
  })
  .catch(error => {
    console.error('There was a problem fetching the mainSections:', error);
  });
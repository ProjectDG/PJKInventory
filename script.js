


// Fetch the JSON data
fetch('data.json')
  .then(response => {
    // Check if the response is ok, else throw an error
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(mainSections => {
    let backToSection = "";
    let backToCategory = "";
    let currentBrands = [];
    

    // Wait until the document is ready
    $(document).ready(function() {
      // Function to clear the console and button container, and log a message
      function consoleFunc() {
        console.clear();
        $("#buttonContainer").empty();
        $("#titleContainer").empty();
        console.log("----- My Inventory App -----");
      }

      // Initial console message
      consoleFunc();
      console.log("----- Please Select a Section -----");

      function createTitleContainer() {
        const main = document.getElementById("main");

        const titleContainer = document.createElement("div");
        titleContainer.setAttribute("id", "titleContainer");
        titleContainer.innerHTML = "<h1>PJK</h1><br><h1 style='font-size: 1.75vh'>NEIGHBORHOOD CHINESE RESTAURANT</h1>";

        main.append(titleContainer);
      }


      // Create the main container for buttons
      function createContainer() {
        const main = document.getElementById("main");

        const buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("id", "buttonContainer");

        main.append(buttonContainer);
      }

      // Create buttons for each section
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

      // Create buttons for each category in a section
function createCategoryButtons(sectionType) {
  const buttonContainer = document.getElementById("buttonContainer");
  mainSections.forEach(x => {
    if (x.type === sectionType) {
      let sections = x.sections;
      sections.forEach(y => {
        if (y.category !== null) {
          let newButton = document.createElement("button");
          newButton.setAttribute("id", y.category);
          newButton.setAttribute("class", "all-buttons category-buttons");
          newButton.innerText = y.category;
          buttonContainer.append(newButton);
          console.log(y.category);
        } else {
          consoleFunc();
          console.log("----- Please Select a Brand -----");
          let brands = y.brands;
          // Sort brands alphabetically by name
          brands.sort((a, b) => a.name[0].localeCompare(b.name[0]));
          // Create buttons for each brand if there is no category
          brands.forEach(i => {
            let newButton = document.createElement("button");
            newButton.setAttribute("id", i.name[0]);
            newButton.setAttribute("class", "all-buttons brand-buttons");
            if (i.name.length > 1) {
              newButton.innerHTML = `<span>${i.name[0]}</span><br><span style="font-size: 75%;">${i.name[1]}</span>`;
            } else {
              newButton.innerHTML = `<span>${i.name[0]}</span>`;
            }
            buttonContainer.append(newButton);
            console.log(i.name);
          });
        }
      });
    }
  });
}

// Create buttons for each brand in a category
function createBrandButtons(category) {
  const buttonContainer = document.getElementById("buttonContainer");
  mainSections.forEach(x => {
    x.sections.forEach(y => {
      if (y.category === category) {
        let brands = y.brands;
        // Sort brands alphabetically by name
        brands.sort((a, b) => a.name[0].localeCompare(b.name[0]));
        currentBrands = brands; // Store the current brands
        brands.forEach(i => {
          let newButton = document.createElement("button");
          newButton.setAttribute("id", i.name[0]);
          newButton.setAttribute("class", "all-buttons brand-buttons");
          if (i.name.length > 1) {
            newButton.innerHTML = `<span>${i.name[0]}</span><br><span style="font-size: 75%;">${i.name[1]}</span>`;
          } else {
            newButton.innerHTML = `<span>${i.name[0]}</span>`;
          }
          buttonContainer.append(newButton);
          console.log(i.name);
        });
      }
    });
  });
}


      // Create a back button
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

      // Remove a back button
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

      // Function to go back to the section selection
      function backToSectionFunction() {
        consoleFunc();
        console.log("----- Please Select a Section -----");

        createSectionButtons();
        removeBackButton("mainBackButton");
        removeBackButton("backToBrandsButton");
        removeBackButton("backButton");
        let title = "<h1>PJK</h1><br><h1 id='subtitle' style='font-size: 1.75vh'>NEIGHBORHOOD CHINESE RESTAURANT</h1>";    //---------------NOT WORKING AFTER HITTING DIFFERENT BACK BUTTON
        $("#titleContainer").append(title);
      }

      // Function to go back to the category selection
      function backToCategoryFunction() {
        consoleFunc();
        console.log("----- Please Select a Category -----");
        createCategoryButtons(backToSection);
        createBackButton("mainBackButton", "Main", backToSectionFunction);
        removeBackButton("backToBrandsButton");
        removeBackButton("backButton");
        let forTitle = `<h1>${backToSection}</h1>`;
        $("#titleContainer").append(forTitle);
      }

      // Function to go back to the main section
      function mainButtonFunction() {
        consoleFunc();
        console.log("----- Please Select a Section -----");
        createSectionButtons();
        removeBackButton("backToBrandsButton");
        removeBackButton("backButton");
        removeBackButton("mainBackButton");
        let title = "<h1>PJK</h1><br><h1 id='subtitle' style='font-size: 1.75vh'>NEIGHBORHOOD CHINESE RESTAURANT</h1>";    //---------------NOT WORKING AFTER HITTING DIFFERENT BACK BUTTON
        $("#titleContainer").append(title);
      }

      // Function to go back to the brand selection
      function backToBrandsFunction() {
        consoleFunc();
        console.log("----- Please Select a Brand -----");
        const buttonContainer = document.getElementById("buttonContainer");
        currentBrands.forEach(i => {
          let newButton = document.createElement("button");
          newButton.setAttribute("id", i.name[0]);
          newButton.setAttribute("class", "all-buttons brand-buttons");
          if (i.name.length > 1) {
            newButton.innerHTML = `<span>${i.name[0]}</span><br><span style="font-size: 75%;">${i.name[1]}</span>`;
          } else {
            newButton.innerHTML = `<span>${i.name[0]}</span>`;
          }
          buttonContainer.append(newButton);
        });
        createBackButton("mainBackButton", "Main", mainButtonFunction);
        createBackButton("backButton", `Back To ${backToSection}`, backToCategoryFunction);
        removeBackButton("backToBrandsButton");
        let forTitle = `<h1>${backToCategory}</h1>`;
        $("#titleContainer").append(forTitle);
      }

      // Create a div with a specified ID and class
      function createDiv(id, section) {
        let buttonContainer = document.getElementById("buttonContainer");
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", id);
        newDiv.setAttribute("class", section);
        buttonContainer.appendChild(newDiv);
      }

      // Initial setup: create the main container and section buttons
      createTitleContainer();
      createContainer();
      createSectionButtons();

      // Event listener for section buttons
      $(document).on("click", ".section-buttons", function() {
        consoleFunc();
        console.log("----- Please Select a Category -----");
        createCategoryButtons(this.id);
        createBackButton("mainBackButton", "Main", mainButtonFunction);
        backToSection = this.id;
        let title = `<h1>${this.id}</h1>`;
        $("#titleContainer").append(title);
      });

      // Event listener for category buttons
      $(document).on("click", ".category-buttons", function() {
        consoleFunc();
        console.log("----- Please Select a Brand -----");
        createBrandButtons(this.id);
        createBackButton("mainBackButton", "Main", mainButtonFunction);
        createBackButton("backButton", `Back To ${backToSection}`, backToCategoryFunction);
        backToCategory = this.id;
        let title = `<h1>${this.id}</h1>`;
        $("#titleContainer").append(title);
      });

      // Event listener for brand buttons
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

        // Find the selected brand and populate the information
        mainSections.forEach(x => {
          if (x.type === backToSection) {
            let sections = x.sections;
            sections.forEach(y => {
              if (y.category === backToCategory || y.category === null) {
                if (y.category === null) {
                  $("#backButtonDiv").empty();
                  createBackButton("mainBackButton", "Main", mainButtonFunction);
                  createBackButton("backButton", `Back To ${backToSection}`, backToCategoryFunction);
                }

                let brands = y.brands;
                brands.forEach(i => {
                  if (this.id === i.name[0]) {
                    console.log("Description of " + i.name[0] + ":");
                    i.sectionInfo.forEach(x => {
                      console.log(x);
                    });
                    photoLink = i.photo;
                    photoTitle = i.name[0]; // Set title to the first index only

                    let infoArr = 0;

                    if (i.sectionNames === null || i.sectionNames === undefined) {
                      return;
                    } else {
                      let forTitle = "<h1>PJK</h1><br><h1 id='subtitle' style='font-size: 1.75vh'>NEIGHBORHOOD CHINESE RESTAURANT</h1>";
                      $("#titleContainer").append(forTitle);
                      i.sectionNames.forEach(n => {
                        let sectionTitle = n;
                        let forID = sectionTitle.replace(/\s/g, '');
                        let infoDiv = document.getElementById("infoDiv");
                        let sectionDiv = document.createElement("div");
                        sectionDiv.setAttribute("id", forID);
                        sectionDiv.setAttribute("class", "sections");
                        sectionDiv.innerText = sectionTitle;

                        let sectionInfo = document.createElement("div");
                        sectionInfo.setAttribute("id", forID + "Section");
                        sectionInfo.setAttribute("class", "info");

                        let sectionList = document.createElement("ul");
                        sectionList.setAttribute("id", forID + "List");

                        i.sectionInfo[infoArr].forEach(info => {
                          let listItem = document.createElement("li");
                          listItem.innerHTML = info;
                          sectionList.appendChild(listItem);
                        });

                        infoArr = infoArr + 1;

                        infoDiv.append(sectionDiv);
                        infoDiv.append(sectionInfo);
                        sectionInfo.append(sectionList);
                      });
                    }
                  }
                });
              }
            });
          }
        });

        // Display the photo and title of the selected brand
        let photo = document.createElement("img");
        photo.setAttribute("src", photoLink);
        let photoDiv = document.getElementById("photoDiv");
        photoDiv.appendChild(photo);

        let title = document.createElement("h1");
        title.setAttribute("id", `${photoTitle.replace(/\s/g, '')}Title`);
        title.innerHTML = `<span>${photoTitle}</span>`;
        let titleDiv = document.getElementById("titleDiv");
        titleDiv.appendChild(title);
      });

      // Toggle visibility of sections within the infoDiv
      $(document).on("click", ".sections", function() {
        let newID = "#" + this.id + "Section";
        $(newID).toggle();
        let sectionID = $(this).attr("id") + "Section";
        let infoDiv = $("#infoDiv");
        let scrollTo = $("#" + sectionID).position().top;
        infoDiv.animate({
          scrollTop: scrollTo - infoDiv.offset().top + infoDiv.scrollTop()
        }, "slow");
      });
    });
  })
  .catch(error => {
    console.error('There was a problem fetching the mainSections:', error);
  });

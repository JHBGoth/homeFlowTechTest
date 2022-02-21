/////////////////////////////////////////////////////start in cmd
//npm start
//ruby app.rb

/////////////////////////////////////////////////////image paths
//http://mr0.homeflow.co.uk/
//or
//http://mr1.homeflow.co.uk/

/////////////////////////////////////////////////////URL
//http://localhost:4567

//////////////////////////////////////////////////////Documentation
//https://developer.homeflow.co.uk/appendix/#hestia-urls

function searchProperties(){
  let area = document.querySelector("#input_propertySearchArea").value;
  let channel = document.querySelector('input[name="channelOptions"]:checked').value;
  if(area=="")
  {
    area=brighton;
  }

  let numberOfBedrooms="";
  let numberOfBathrooms="";

  var homeFlow_URI= '/api/properties?location=' + area + '&channel=' + channel +'';

  //fetch('/api/properties?location=brighton')
  fetch(homeFlow_URI)
    .then(response => response.json())
    .then((json) => {
    var testJSN= json.result;

    //console.log(json.result.properties.elements);


const imagePathPrefix='http://mr0.homeflow.co.uk/';

const propertyCardContainer = document.querySelector("#propertyCardContainer");
const propertyCardTemplate = document.querySelector("#propertyCard");

propertyCardContainer.innerHTML='';


    json.result.properties.elements.forEach(displayResults);

    function displayResults(item,index)
    {
      let displayCode = '';

      displayCode += '<div class="propertyPrice mb-1">' + checkForNulls(item.price).toString() + '</div></br>';
      displayCode += '<h4>' + checkForNulls(item.display_address).toString() + '</h4>';

      displayCode += '<b>Date added: </b>' + amendDate(item.create_date) + '</br>';
      displayCode += '<b>Property Type: </b>' + checkForNulls(item.property_type).toString() + '</br>';
      displayCode += '<b>Number of bathrooms: </b>' + checkForNulls(item.bathrooms).toString() + '</br>';
      displayCode += '<b>Number of bedrooms: </b>' + checkForNulls(item.bedrooms).toString() + '</br>';
      displayCode += '<b>Reception Rooms: </b>' + checkForNulls(item.reception_rooms).toString() + '</br>';
      displayCode += '<b>Description:</b><br>' + checkForNulls(item.short_description).toString().substring(0,150) + '...</br>';

      var clone = propertyCardTemplate.content.cloneNode(true);
      var img = clone.querySelectorAll("img");
      img[0].src = imagePathPrefix + item.photos[0];
      var h5 = clone.querySelectorAll("h5");
      h5[0].textContent = checkForNulls(item.status).toString();
      var p = clone.querySelectorAll("p");
      p[0].innerHTML = displayCode;

      /////////
      //display the rest of the Images
      /////////
      let imagesHTML = '';
      item.photos.forEach(displayImages);

      //I would normally place the images in some type of slider, i just wanted to show that I know how
      //to retrieve the images and display them
      function displayImages(item)
      {
        let imagePathHTML="";
        if(checkForNulls(item)=='no data')
        {
          //do nothing
        }
        else
        {
          let imageAbsolutePath=imagePathPrefix + item.toString();
          imagePathHTML='<div class="col"><img src="' + imageAbsolutePath + '" style="width:100%"></div>';
          imagesHTML +=imagePathHTML;
        }
      }

      var sect = clone.querySelectorAll("section");
      sect[0].innerHTML = imagesHTML;

      propertyCardContainer.appendChild(clone);


    }

    function amendDate(itemValue)
    {
      let amendedDate="";
      if (itemValue == null || itemValue == '')
      {
        return 'no data';
      }
      else {
        const date = new Date(itemValue);
        amendedDate = date.toDateString();
        return amendedDate;
      }
    }

    function checkForNulls(itemValue)
    {
      if (itemValue == null || itemValue == '')
      {
        return 'no data';
      }
      else {
        return itemValue;
      }
    }


    })
    .catch((err) => {
      console.error(err);
      document.querySelector('#messageBox').display='block';
      document.querySelector('#messageBox').innerHTML = 'Something went wrong. Check the console for details.';
    });
}

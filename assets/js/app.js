import { defaults as defaultValues, inputs as defaultInputs } from "./defaults.js";

import { assetify, capitalize } from "./helpers.js";

const defaults = {
  init() {
    this.product = {
      imageName: defaultValues.productImageName,
      color: defaultValues.color,
      selectedPrint: defaultValues.productPrintSelect,
      text: {
        value: defaultValues.text,
        color: defaultValues.textColor
      },
      uploadedPrint: defaultValues.productPrintUploadName
    },

    this.inputs = defaultInputs;
  }  
}

const model = {
  init() {
    this.product = defaults.product;
    this.inputs = defaults.inputs;
    console.log(this);
  }
}

const octopus = {
  init() {
    defaults.init();
    model.init();
    formView.init();
    productView.init();
    canvasView.init();
  },

  updateProductColor({ target }) {
    model.product.color = target.value;
  },

  updateText({ target }) {
    switch (target.type) {
      case 'text' :
        model.product.text.value = target.value;
        break;
      case 'color':
        model.product.text.color = target.value;
        break;
    }
    canvasView.render();
  },

  updatePrint({ target }) {
    console.log('Updating Print!');
  },

  getProduct () {
    return model.product;
  },

  getInputs () {
    return model.inputs;
  }
}

const productView = {
  init() {
    this.productDiv = document.body.querySelector('#product');
    this.productImage = this.productDiv.querySelector('#product-image'); 
    this.render();
  },

  render() {
    const { imageName } = octopus.getProduct();
    this.productImage.src = assetify(imageName);
  }
}

const canvasView = {
  init() {
    this.canvas = new fabric.Canvas('canvas');
    this.render();
  },

  render () {
    this.canvas.clear();
    this.text = new fabric.Text(octopus.getProduct().text.value);
    
    this.canvas.add(this.text);
  }
}

const formView = {
  init(){
    this.form = this.createForm();
    this.colorInput = document.querySelector('[id="color"]');
    this.textInput = document.querySelector('[id="text"]');
    this.textColorInput = document.querySelector('[id="text-color"]');
    this.printUploadInput = document.querySelector('[id="print-upload"]');
    this.setupEventListeners();
  },

  setupEventListeners() {

    this.colorInput.onchange = octopus.updateProductColor;

    this.textColorInput.onchange = octopus.updateText;
    
    this.textInput.oninput = octopus.updateText;
    
    this.printUploadInput.onchange = octopus.updatePrint;
  },

  createForm() {
    // I'd like to change this to const form but i cant figure the argument binding pattern for callback
    this.form = document.createElement('form');
    this.form.innerHTML ='<h3>New Form</h3>';  
    const inputs = octopus.getInputs();
    inputs.forEach(this.createInputField.bind(this));
    return document.body.appendChild(this.form);
  },

  createInputField(input) {
    switch (input.type) {
      case 'text':
      case 'email':
      case 'color':
      case 'file':
        const inputBlockHTML = `<label for="${input.id}">${input.label || capitalize(input.name)}</label>
                            <input type="${input.type}" name="${input.name}" value="${input.value}" id="${input.id}">`;
        this.form.innerHTML += inputBlockHTML;
    }
  },

  render () {

  }
}

octopus.init();
/*
const canvas = new fabric.Canvas('canvas');

 function updateTshirtImage(imageURL){
    fabric.Image.fromURL(imageURL, function(img) {                   
        img.scaleToHeight(250);
        img.scaleToWidth(250); 
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
    });
}

document.getElementById("tshirt-color").addEventListener("input", function(){
    document.getElementById("tshirt").style.backgroundColor = this.value;
}, false);

// Update the TShirt color according to the selected color by the user
document.getElementById("tshirt-design").addEventListener("change", function(){

    const imgURL = `./assets/images/${this.value}`;
    updateTshirtImage(imgURL);
}, false);

document.getElementById('tshirt-custompicture').addEventListener("change", function(e){
    const reader = new FileReader();
    
    reader.onload = function (e){
        const image = new Image();
        image.src = e.target.result;

        // When the picture loads, create the image in Fabric.js
        image.onload = function () {
            const img = new fabric.Image(image);
            img.scaleToHeight(300);
            img.scaleToWidth(300); 
            canvas.centerObject(img);
            canvas.add(img);
            canvas.renderAll();
        };
    };

    // If the user selected a picture, load it
    if(e.target.files[0]){
        reader.readAsDataURL(e.target.files[0]);
    }
}, false);

// When the user selects a picture that has been added and press the DEL key
// The object will be removed !
document.addEventListener("keydown", function(e) {
    var keyCode = e.keyCode;

    if(keyCode == 46){
        console.log("Removing selected element on Fabric.js on DELETE key !");
        canvas.remove(canvas.getActiveObject());
    }
}, false);*/
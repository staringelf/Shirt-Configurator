const canvas = new fabric.Canvas('canvas');

 function updateTshirtImage(imageName){
   
    if(!imageName){
      return canvas.clear();
    }

    const imageURL = `./assets/images/${imageName}`;
    console.log(imageURL);
    fabric.Image.fromURL(imageURL, img => {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height
        });
    });
}

document.getElementById("tshirt-color").addEventListener("change", function(){
    document.getElementById("tshirt").style.backgroundColor = this.value;
}, false);

// 2. When the user picks a design:
// Update the TShirt background image according to the selected image by the user
document.getElementById("tshirt-design").addEventListener("change", function(){

    // Call the updateTshirtImage method providing as first argument the URL
    // of the image provided by the select
    updateTshirtImage(this.value);
}, false);
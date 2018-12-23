$(function () {
   $("#slider").slider({
      min: 3,
      max: 30,
      slide: function (event, ui) {
         $("#circle").height(ui.value);
         $("#circle").width(ui.value);
      }
   });

   //Declare variables
   //Painting/Erasing or not
   var paint = false;

   //Painting or erasing
   var paint_erase = "paint";

   //Get the canvas and context
   var canvas = document.getElementById("paint");
   var ctx = canvas.getContext("2d");

   //Get the canvasContainer
   var container = $("#canvasContainer");

   //Mouse position
   var mouse = {
      x: 0,
      y: 0
   };

   //Onload load saved work from localStorage
   if (localStorage.getItem("imgCanvas") != null) {
      var img = new Image();
      img.onload = function () {
         ctx.drawImage(img, 0, 0);
      };
      img.src = localStorage.getItem("imgCanvas");
   }

   //Set drawing parameters
   ctx.lineWeight = 3;
   ctx.lineJoin = "round";
   ctx.lineCap = "round";

   //Click inside canvasContainer
   container.mousedown(function (e) {
      paint = true;
      ctx.beginPath();
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
      ctx.moveTo(mouse.x, mouse.y);
   });

   //Move the mouse while holding mouse key
   container.mousemove(function (e) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
      if (paint == true) {
         if (paint_erase == "paint") {
            //Get color input
            ctx.strokeStyle = $("#paintColor").val();
         } else {
            //white color
            ctx.strokeStyle = "white";
         }
         ctx.lineTo(mouse.x, mouse.y);
         ctx.stroke();
      }
   });

   //Mouse up -> we are not painting or erasing anymore
   container.mouseup(function () {
      paint = false;
   });

   //If we leave the container we are not painting or erasing anymore
   container.mouseleave(function () {
      paint = false;
   });

   //Click on the erase button
   $("#erase").click(function () {
      if (paint_erase == "paint") {
         paint_erase = "erase";
      } else {
         paint_erase = "paint";
      }
      $(this).toggleClass("eraseMode");
   });

   //Click on the save button
   $("#save").click(function () {
      if (typeof (localStorage) != null) {
         localStorage.setItem("imgCanvas", canvas.toDataURL());
         window.alert("Your drawing has just been saved to LocalStorage");
      } else {
         window.alert("Your device doesn't support LocalStorage!");
      }
   });

   //Click on the reset button
   $("#reset").click(function () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      paint_erase = "paint";
      $("#erase").removeClass("eraseMode");
   });

   //Change color input
   $("#paintColor").change(function () {
      $("#circle").css("background-color", $(this).val());
   });

   //Change lineWidth using slider
   $("#slider").slider({
      min: 3,
      max: 30,
      slide: function (event, ui) {
         $("#circle").height(ui.value);
         $("#circle").width(ui.value);
         ctx.lineWidth = ui.value;
      }
   });
});
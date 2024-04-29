const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(canvas.width,canvas.height);
ctx.stroke();

define(['./pickColor', 'jquery', 'text!./message.txt'], function (pickColor, $, message) {
        
        var arrayToHex = function (a) {
            return '#' + a.map(function (n) { var h = n.toString(16); return h.length === 1 ? '0' + h : h; } ).join('');
        };
        
        $(document).ready(function () {
           var ol = $('<ol></ol>').appendTo($('body'));
           var i = 0;
           var hexColor;
           while (i++ < 100) {
                hexColor = arrayToHex(pickColor(i));
                ol.append('<li style="background-color:' + hexColor + '" title="' + hexColor + '">' + i + '</li>');
           };
           
           
           $('h1').text(message); 
           console.log(message);
        });
        
});
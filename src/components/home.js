import React from 'react';
require('../css/style.css')

class Home extends React.Component{

    constructor(props){
        super(props); 
    }


    uploadImg(event){  
          
        var bannerImage = document.getElementById('bannerImg');
        var res = document.getElementById('res');
        var img = document.getElementById('tableBanner');

        var height = img.height;
        var width = img.width;
        if (height > 1024 || height < 1024 || width > 1024 || width < 1024) {
          alert("Height and Width must be 1024px.");
          return false;
        }      
           
                var file = event.target.files[0];
                // Basic type checking.
                console.log('file type',file);
                if (file.type.indexOf('image') < 0) {
                    res.innerHTML = 'invalid type';
                    return;
                }
            
                // Create a file reader
                var fReader = new FileReader();
            
                // Add complete behavior
                fReader.onload = function() {                   

                    // Show the uploaded image to banner.
                    img.src = fReader.result;
                    document.getElementById('createMoreImg').classList.remove('dn');
            
                    // Save it when data complete.
                    // Use your function will ensure the format is png.
                    var x = function(img){
                        var canvas = document.createElement("canvas");
                        canvas.width = img.width;
                        canvas.height = img.height;
                    
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0);
                    
                        var dataURL = canvas.toDataURL("image/png");
                    
                        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
                    }
                    localStorage.setItem("imgData", x(img));
                    // You can just use as its already a string.
                    // localStorage.setItem("imgData", fReader.result);
                };
            
                // Read the file to DataURL format.
                fReader.readAsDataURL(file);
    } 
  


    // fetchimage () {
    //     var img = document.getElementById('tableBanner');
    //     var dataImage = localStorage.getItem('imgData');
    //     img.src = "data:image/png;base64," + dataImage;
    //     // If you don't process the url with getBase64Image, you can just use
    //     // img.src = dataImage;
    // }

    createFourImg(){
  console.log('in here');
        // var img = document.getElementById('tableBanner');
        var dataImage = localStorage.getItem('imgData');
        // img.src = "data:image/png;base64," + dataImage;
        var img1 = document.getElementById('horiz');
        var img2= document.getElementById('vert');
        var img3 = document.getElementById('horizsm');
        var img4 = document.getElementById('gallery');
        img1.style.height = '450px';
        img1.style.width =  '755px';

        img2.style.height = '450px';
        img2.style.width =  '365px';

        img3.style.height = '212px';
        img3.style.width =  '365px';

        img4.style.height = '380px';
        img4.style.width =  '380px';
       
        img1.src = "data:image/png;base64," + dataImage;
        img2.src = "data:image/png;base64," + dataImage;
        img3.src = "data:image/png;base64," + dataImage;
        img4.src = "data:image/png;base64," + dataImage;
        document.getElementById('createMoreImg').classList.add('dn');
    }

    

 render(){

     return(<div className='flex-cont'>
         <input className='flex-item' type="file" id="bannerImg"  accept="image/*"
     onChange={(event)=> { 
         this.uploadImg(event) 
        
    }}/>
     <img className='flex-item' src="" id="tableBanner" />
     <div  className='flex-item' id="res"></div>
     <div  className='flex-item' id="createMoreImg" className='dn'><button onClick={()=> this.createFourImg()}>Create More Img</button>
    
    
     </div>
     <div className='imgParent'>
    <img src="" id="horiz"  />
     <img src="" id="vert" />
     <img src="" id="gallery" />
     <img src="" id="horizsm" />
     </div>
     </div>)
 }
}

export default Home;
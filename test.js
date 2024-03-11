const handleImageChange = (e) => {
    setSelectedImgs([]);
    const files = e.target.files;

    // Validate up to 4 images
    if (files.length + selectedImgs.length > 4) {
      alert('You can upload up to 4 images.');
      return;
    }

    const newImages = Array.from(files).map((file) => ({
      id: Date.now(), // Add a unique identifier to each image
      photo: URL.createObjectURL(file),
      newImage: file,
    }));

    setSelectedImgs((prevImgs) => [...prevImgs, ...newImages]);
  };

   {/* IconButton for Update */}
                            {/* <IconButton aria-label="update" onClick={handleUpdate}>
                              <EditIcon />
                            </IconButton> */}


                            


// sudo apt install nginx

// sudo nano /etc/nginx/sites-available/default
// Add the following to the location part of the server block

//     server_name yourdomain.com www.yourdomain.com;

//     location / {
//         proxy_pass http://localhost:8001; #whatever port your app runs on
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_cache_bypass $http_upgrade;
//     }



// sudo add-apt-repository ppa:certbot/certbot
// sudo apt-get update
// sudo apt-get install python3-certbot-nginx
// sudo certbot --nginx -d admin.pickneybank.com
// no-reply@pickneybank.com
// 9910205645
// http://admin.pickneybank.com/

// sudo apt uninstall nginx
// vm-pickney-backend
// pickney
// PB_bank1231234
// pickneybank@gmail.com@57.151.115.0

// git clone https://github.com/sarvar404/pickney-backend.git
// rm -rf pickney-backend

//         proxy_pass http://localhost:8000; #whatever port your app runs on
//         proxy_http_version 1.1;
//         proxy_set_header Upgrade $http_upgrade;
//         proxy_set_header Connection 'upgrade';
//         proxy_set_header Host $host;
//         proxy_cache_bypass $http_upgrade;

//         https://admin.pickneybank.com/

//         sudo certbot --nginx -d admin.pickneybank.com
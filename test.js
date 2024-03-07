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
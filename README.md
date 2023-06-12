## Amazon-App / Capstone Product
#### Shop all your favorite products in one spot - https://amazon-app-yqe5.onrender.com

Hello, I'm Caitlyn, and I am delighted to share my capstone project with you—an Amazon clone I developed during my time at App Academy. To explore the client-side of the website, kindly click on the link provided above. If you're interested in examining the source code, feel free to access it [here](https://github.com/cstandre/capstone_project). Additionally, I have compiled a comprehensive [GitHub wiki](https://github.com/cstandre/capstone_project/wiki), which contains valuable information such as the database schema, backend routes, frontend routes, feature list, React state, and intricate details about the site's functionality. I encourage you to peruse the wiki for a deeper understanding of how the website operates.

### Setup Instructions
- Clone Repository - [Source Code](https://github.com/cstandre/capstone_project)
- Install dependencies
	```
	pipenv install -r requirements.txt
	```
- Start the backend server
	```
	pipenv shell
	```
	```
	flask db upgrade
	```
	```
	flask seed all
	```
	```
	flask run
	```
- Start the frontend server
	```
	cd react-app
	```
	```
	npm start
	```
### Amazon-App was created with the following
- Flask
- Python
- Alembic
- WTforms
- React.js
- Javascript
- SQLAlchemy
- AWS S3
- ReactSimpleSlider
- Render

### Landing Page
![enter image description here](https://res.cloudinary.com/djclmc80y/image/upload/v1686590111/2023-06-12_10-14-10_xkvyfu.gif)
### Product Detail Page and Cart
![enter image description here](https://res.cloudinary.com/djclmc80y/image/upload/v1686590575/2023-06-12_10-22-46_nkltun.gif)
### User-Store Page
![enter image description here](https://res.cloudinary.com/djclmc80y/image/upload/v1686592219/Snag_239153be_zlnenh.png)
### Create a new product
#### Select 'Sell More'
![enter image description here](https://res.cloudinary.com/djclmc80y/image/upload/v1686592224/Snag_239165c0_zo63gk.png)
![enter image description here](https://res.cloudinary.com/djclmc80y/image/upload/v1686592227/Snag_2391736c_g1cq4x.png)

### Technical Implementation
#### AWS S3 was the most challenging portion of this project. I wanted a way for users to upload one or more pictures at the same time. I also wanted the first image added to be considered the 'display image'. To figure out how to upload multiple images and use AWS, I console logged and printed almost everything to debug and made changes a long the way.

```
        const formData = new FormData();

        formData.append('image[]', previewImage);
        formData.append(`is_preview_0`, true);

        selectedImages.forEach(img => {
          formData.append('image[]', img);
        });

        // console.log(formData)

        const res = await fetch(`/api/images/${productId}`, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            await res.json();
            history.push(`/products/${productId}`)
        };
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            alert("Please select up to 5 files only.");
            return;
        };

        setselectedImages(files.slice(1))
        setPreviewImage(files[0]);
    }
    ```

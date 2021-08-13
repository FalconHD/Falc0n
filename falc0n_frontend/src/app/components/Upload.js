import React, { useEffect, useState } from 'react';

const Upload = ({ setImageProduct }) => {

    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
        if (image) {
            setImageProduct(image)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setImageUrl(null)
        }
    }, [image])

    return (
        <div class="imgUp">
            <div class="imagePreview">
                {imageUrl ?
                    <img src={imageUrl} alt="" />
                    : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="feather feather-image">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                }
            </div>
            <label class="buttonUpload">
                <div style={{ display: "flex", justifyContent: 'center', alignItems: "flex-end", gap: "20px", marginTop: "10px" }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <small>UPDATE PRODUCT IMAGE</small>
                </div>
                <input onChange={(e) => setImage(e.target.files[0])}
                    type="file" class="uploadFile img"
                    style={{ width: '0px', height: '0px', overflow: 'hidden' }} />
            </label>
        </div>
    );
}

export default Upload;

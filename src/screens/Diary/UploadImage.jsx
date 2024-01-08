import React, { useRef, useState } from "react";
import "./UploadImage.css";
import Header from "components/Header";
import ImageFileInput from "components/ImageInput";
import { toast } from "react-toastify";
import { Button, ImageList, ImageListItem } from "@mui/material";
import { AiTwotoneFolderAdd } from "react-icons/ai";
import ImageInput from "components/ImageInput/ImageInput";


const UploadImage = ({ close, upload }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [data, setData] = useState([]);

    var item = 0;
    var isUpdate = true;

    const inputRef = useRef();

    const fileSelection = (files) => {
        if (files.length > (4 - selectedFiles.length)) {
            toast("you can only select max " + (4 - selectedFiles.length) + " files")
            return;
        }

        if (files.length > 0) {
            const filesUntilNow = selectedFiles;
            const newFiles = [...filesUntilNow, ...files];

            setSelectedFiles(newFiles);
            const newData = [];

            newFiles.forEach((file) => {
                let newMedia = {
                    url : URL.createObjectURL(file),
                    isVideo : file.type.startsWith("video/")
                }
                newData.push(newMedia);
            })

            setData([...newData]);
        }
    }

    const onFilesChange = (files) => {
        if (files.length > 0) {
            const currentFiles = [...selectedFiles];
            currentFiles[item] = files[0];
            setSelectedFiles(currentFiles);
            
            const newData = [...data];
            newData[item] = {
                url : URL.createObjectURL(files[0]),
                isVideo : files[0].type.startsWith("video/")
            };
            setData(newData);
        }
    }

    const overlayClicked = (index) => {
        if (isUpdate) {
            item = index;
            isUpdate = false;
        }
        inputRef.current.click();
        isUpdate = true
    }

    return(
        <>
            <div className="main-container">
                <div className="container">
                    <Header />

                    <div className="flex justify-between">
                        <p className="title">Upload Media</p>
                        <div className="close" onClick={close}>
                            CLOSE
                        </div>
                    </div>
                    
                    {selectedFiles.length !== 4 && 
                        <div className="image-upload-container">
                            <ImageFileInput text={"Upload Media"} multiple={true} onFilesChange={fileSelection} isVideo={true}/>
                        </div>
                    }

                    {
                        data.length > 0 && (
                            <div>
                                <ImageList sx={{ width: "90%", height: "90%", marginLeft : "2rem", marginTop : "2rem" }} cols={2} gap={5}>
                                    {data.map((item, key) => (
                                        <ImageListItem key={key}>
                                            <div className="image-container">
                                                {item.isVideo ? (
                                                    <>
                                                        <video
                                                            src={item.url}
                                                            controls
                                                            className="image-style" 
                                                        />
                                                    </>
                                                ):(
                                                    <img src={`${item.url}`} loading="lazy" className="image-style" alt="main"/>
                                                )}
                                                <div className="overlay" onClick={() => overlayClicked(key)}>
                                                    <AiTwotoneFolderAdd size="2rem"/>
                                                    <p className="overlay-text">
                                                        Change Media
                                                    </p>
                                                    <ImageInput
                                                        inputRef={inputRef}
                                                        onFilesChange={(file) => onFilesChange(file)}
                                                        isVideo={true}
                                                    />
                                                </div>
                                            </div>
                                        </ImageListItem>
                                    ))}
                                </ImageList>

                                <Button
                                    sx={{
                                        marginTop : "2rem",
                                        width:"90%",
                                        marginLeft : "2rem",
                                        marginBottom:"2rem"
                                    }}
                                    onClick={() => upload(selectedFiles)}
                                    variant="contained">
                                        Upload
                                </Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default UploadImage;
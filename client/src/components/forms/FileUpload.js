import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Avatar, Badge } from "antd";

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // resize
    let files = e.target.files;
    let allImages = values.images;
    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/upload-images`,
                { image: uri },
                { headers: { authtoken: user ? user.token : "" } }
              )
              .then((res) => {
                allImages.push(res.data);
                toast.success("Images uploaded succesfully!");
              })
              .catch((error) => toast.error(error.message))
              .finally(() => {
                setLoading(false);
                setValues({
                  ...values,
                  images: allImages,
                });
              });
          },
          "base64"
        );
      }
    }
    // send back to server to upload to cloudinary
    // set url to images[] in the parent component - ProductCreate
  };

  const handleImageRemove = (imageId) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/remove-image`,
        { image: imageId },
        { headers: { authtoken: user ? user.token : "" } }
      )
      .then((res) => {
        let filterImages = values.images.filter(
          (image) => image.public_id !== imageId
        );
        console.log(values.images.length);
        setValues({ ...values, images: filterImages });
      })
      .catch((error) => toast.error(error.message))
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
              className="mr-5"
            >
              <Avatar
                shape="square"
                src={image.url}
                onclick={() => window.open(image.url, "_blank")}
                size={80}
              />
            </Badge>
          ))}
      </div>
      <br />
      <div className="row">
        <label className="btn btn-primary btn-raised">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;

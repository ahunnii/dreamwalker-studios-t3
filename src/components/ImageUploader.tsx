import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function ImageUploader() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  const { mutate, error } = trpc.product.createImage.useMutation({
    onSuccess: ({ id }) => {
      console.log(id);
    },
  });

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "my-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dqeszrzmc/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
    mutate({
      src: data?.secure_url,
    });
  }

  return (
    <>
      <h1>Image Uploader</h1>

      <p>Upload your image to Cloudinary!</p>

      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <p>
          <label htmlFor="file"></label>
          <input type="file" name="file" id="file" placeholder="File" />
        </p>

        <img src={imageSrc} alt="" />

        {imageSrc && !uploadData && (
          <p>
            <button>Upload Files</button>
          </p>
        )}

        {uploadData && (
          <code>
            <pre>{JSON.stringify(uploadData, null, 2)}</pre>
          </code>
        )}
      </form>
    </>
  );
}

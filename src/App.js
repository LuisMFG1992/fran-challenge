import "./App.css";
import ImgixClient from "@imgix/js-core";
import { useEffect, useRef, useState } from "react";
import ShowUrl from "./Components/ShowUrl/ShowUrl";
import ImageDisplay from "./Components/ImageDisplay/ImageDisplay";
import InputsFields from "./Components/InputsFields/InputsFields";

const client = new ImgixClient({
  domain: "assets.imgix.net",
  secureURLToken: "",
});

const urlCreator = (imageUrl, paramsObj) => {
  return client.buildURL(imageUrl, paramsObj);
};

function App() {
  const selectedImageRef = useRef();

  const [images, setImages] = useState(["Select an image"]);
  const [params, setParams] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [fullURL, setFullURL] = useState("");
  const [history, setHistory] = useState([]);

  // Fetch all images
  useEffect(() => {
    (async function imageHandler() {
      const response = await fetch(
        "https://storage.googleapis.com/nanlabs-engineering-technical-interviews/imgix-samples-list.json"
      );
      const data = await response.json();
      const urlImages = data.map((element) => element.url.slice(25));
      setImages((prevState) => prevState.concat(urlImages));
    })();
  }, []);

  // Create URL with image and params
  useEffect(() => {
    if (!imageUrl) return;

    setFullURL(urlCreator(imageUrl, params));

    let historyObj = { imageUrl, params };

    console.log({ historyObj });

    setHistory((prevState) => [...prevState, historyObj]);
  }, [imageUrl, params]);

  const selectedImageHandler = () => {
    const selectedImage = selectedImageRef.current.value;
    setImageUrl(selectedImage);
  };

  const paramsHandler = (id, value) => {
    if (!value) {
      setParams((prevState) => {
        const copy = { ...prevState };
        delete copy[id];
        return copy;
      });
    } else {
      setParams((prevState) => {
        return { ...prevState, [id]: value };
      });
    }
  };

  return (
    <div className="flex-col flex mt-2 ml-4 mr-4">
      <ShowUrl fullURL={fullURL} imageUrl={imageUrl} />

      <div className="containerApp p-2">
        <InputsFields
          images={images}
          selectedImageHandler={selectedImageHandler}
          selectedImageRef={selectedImageRef}
          paramsHandler={paramsHandler}
        />
        <ImageDisplay
          fullURL={fullURL}
          selectedImage={imageUrl}
          images={images}
          params={params}
          urlCreator={urlCreator}
        />
      </div>
    </div>
  );
}

export default App;

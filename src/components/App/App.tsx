import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import type { Photo } from "../../types/photo";
import { getPhotos } from "../../services/photos";
import Loader from "../Loader/Loader";
import Text from "../Text/Text";
import PhotosGallery from "../PhotosGallery/PhotosGallery";
import Modal from "../Modal/Modal";

export default function App() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const [photos, setPhotos] = useState<Photo[]>([]);

  const [isLoading, SetIsLoading] = useState<boolean>(false);

  const [isError, SetIsError] = useState<boolean>(false);

  const handleSubmit = async (newQuery: string) => {
try {
  SetIsLoading(true);
  SetIsError(false);
  setPhotos([]);
  const data = await getPhotos(newQuery);

  if (data.length === 0) {
    toast.error('oops');
    return;
  }
  setPhotos(data);

  console.log('data:', data)
} catch  {
  SetIsError(true);
}
finally {
  SetIsLoading(false);
}
  // console.log('newQuery:', newQuery)
}
  const handleSelectPhoto = (photo: Photo | null) => {
    setSelectedPhoto(photo);
}
  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          {isError && <Text textAlign="center">Oops, sorry</Text>}
          {photos.length > 0 && <PhotosGallery onSelect={handleSelectPhoto} photos={photos} />}
          {selectedPhoto && <Modal onClose={() => setSelectedPhoto(null)}>
          <div
        style={{
          backgroundColor: selectedPhoto.avg_color,
          borderColor: selectedPhoto.avg_color,
        }}
      >
        <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
      </div></Modal>}
        </Container>
      </Section>

      <Toaster/>
    </>
  );
}

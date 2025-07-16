export const fileUpload = async(file) => {

    if (!file) throw new Error('No hay imagen para subir');

    const cloudinaryURL = 'https://api.cloudinary.com/v1_1/ditplyhgn/upload';

    const formData = new FormData();

    formData.append('upload_preset', 'react-journal');
    formData.append('api_key', '679745422566395');
    formData.append('file', file);

    try {
        const response = await fetch(cloudinaryURL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) throw new Error('No se pudo subir la imagen');

    const data = await response.json();

    return data.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};
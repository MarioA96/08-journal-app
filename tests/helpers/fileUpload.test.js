import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinary.config({
    cloud_name: 'udemy-react',
    api_key: '977449236981356',
    api_secret: 'vgReLmnl1y5I60tEt6nBhQXJCuM',
    secure: true
}); // Configuración de cloudinary

describe('Pruebas en fileUpload (carga de archivos)', () => {

    test('Debe de subir el archivo correctamente a cloudinary', async() => {
        
        const imgUrl = 'https://i.imgur.com/fHyEMsl.jpg';
        const resp = await fetch( imgUrl );
        const blob = await resp.blob();

        const file = new File([blob], 'foto.jpg');
        file.crossOrigin = ''; // Para evitar errores de CORS

        const url = await fileUpload( file );
        expect( typeof url ).toBe('string');

        // console.log(url);

        // Borrar imagen por ID
        const segments = url.split('/');
        // console.log(segments);
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        // console.log(imageId);
        const cloudResp = await cloudinary.api.delete_resources(['journal/'+imageId], { resource_type: 'image' });
        // console.log({ cloudResp });

    });

    test('Debe de retornar null', async() => {
      
        const file = new File([], 'foto.jpg');

        const url = await fileUpload( file );
        expect( url ).toBe( null );

    });
    

});


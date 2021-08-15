import bcrypt from 'bcryptjs';

const users= [
    {
        name: 'Admin user',
        email: 'admin@gmail.com',
        password: bcrypt.hashSync('12345678', 12),
        isAdmin: true,
    },
    {
        name: 'Denish Kalariya',
        email: 'denish@gmail.com',
        password: bcrypt.hashSync('12345678', 12),
       
    },
    {
        name: 'Sarthak Padariya',
        email: 'sarthak@gmail.com',
        password: bcrypt.hashSync('12345678', 12),
       
    },

]

export default users
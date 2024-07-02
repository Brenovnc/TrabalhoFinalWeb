// https://fkhadra.github.io/react-toastify/introduction/ -> Como usar react Toastify
import { useEffect } from 'react';
import {Form} from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../styles/personalizado.css"

function InputField({ id, type, label, register, error }) {
    // Mostrar o toast de erro
    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            toast.dismiss(); // Fechar o toast quando o erro for corrigido
        }
    }, [error]); // Dispara sempre que houver uma mudança no 'error'

    // Estilos para o input
    const inputStyle = {
        borderColor: error ? 'red' : '#142615',
        backgroundColor: error ? '#975353' : '#142615',
        color: 'white',
        padding: '8px',
        borderRadius: '4px',
        width: '100%',
        marginTop: '5px'
    };

    return (
        <Form>
            <Form.Group className="mb-3" controlId={id}>
                <Form.Label className='text-dark-green'>{label}</Form.Label>
                <Form.Control type={type} style={inputStyle} {...register}/>
            </Form.Group>
        </Form>
    );
}

export default InputField;
















// BRENIN
/* function InputField({ id, type, label, register, error }) {
    // Mostrar o toast de erro
    useEffect(() => {
        if (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast.dismiss(); // Fechar o toast quando o erro for corrigido
        }
    }, [error]); // Dispara sempre que houver uma mudança no 'error'

    // Estilos para o input
    const inputStyle = {
        borderColor: error ? 'red' : 'black', // if ternário: Se error, borda fica red, senão black
        background: error ? 'rgb(57, 28, 28)' : 'black',
    };

    return (
        <div className="div-InputField">
            <label htmlFor={id}>{label}</label>
            <input type={type} style={inputStyle} id={id} {...register}/>
        </div>
    );
}

export default InputField;
 */













// // ===== ESSA FOI A PRIMEIRA VERSÃO, QUE NÃO MUDA NADA =====
// function InputField({ id, type, label, register, error}) {
//     return (
//         <div class="div-InputField">
//             <label htmlFor={id}>{label}</label>
//             <input
//                 type={type}
//                 id={id}
//                 {...register}
//             />
//             {/* Só renderiza a div erro se erro existir */}
//             {error && <div class="erro">{error.message}</div>}
//         </div>
//     );
// }

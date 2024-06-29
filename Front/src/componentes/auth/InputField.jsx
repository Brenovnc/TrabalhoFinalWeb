// https://fkhadra.github.io/react-toastify/introduction/ -> Como usar react Toastify
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

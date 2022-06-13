
const Alerta = ({alerta}) => {
    return (
        alerta?.msg && (
            <div
                className={`
                    ${alerta?.error ? 'from-red-400 to-red-600' : 'from-indigo-400 to-indigo-600'}
                    bg-gradient-to-br text-white text-center uppercase p-3 font-bold rounded-xl mb-10 text-sm
                `}
            >
                {alerta?.msg}
            </div>
        )
    )
}

export default Alerta;
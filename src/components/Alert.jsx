export const Alert = ({alert}) => {
   console.log("alert",alert)
  return (<>
     <div className={`flex alih-14 ${alert.error ? 'from-cyan-50 to-cyan-100 border border-red-300' : 'from-green-100 to-green-300 border border-green-300' } bg-gradient-to-r text-center mb-6 p-3 rounded-lg uppercase  text-white font-bold text-sm`}>
        <p className={`flex-row justify-content-center align-items-center mx-auto text-align-center font-medium ${alert.error ? 'text-red-600 text-lg' : 'text-green-600 text-md' }  leading-5`}>{ alert.msg }</p> 
     </div>
  </>)
}

import React, { useEffect, useState } from 'react'
import { FormCures } from '../components/FormCures'

export const RegisterCures = () => {

  return (
    <>
    {/* Incluir Pasos */}
        <div className="flex justify-center px-1 md:px-4">
       <div className="flex flex-col max-w-full px-3 py-6 md:w-1/2 md:p-6">
              {alert.msg && <Alert alert={alert} />}
              <div className="flex flex-col flex-1 justify-center mb-8 mt-2">
                <div className="w-full mt-2">
                   <FormCures 
                    />
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

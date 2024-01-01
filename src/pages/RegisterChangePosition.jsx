import React, { useEffect, useState } from 'react'
import { FormChangePosition } from '../components/FormChangePosition'

export const RegisterChangePosition = () => {

  return (
    <>
    {/* Incluir Pasos */}
        <div className="flex px-1 md:px-4">
       <div className="flex flex-col max-w-full px-2 py-6 xl:w-2/3 md:p-6">
              {alert.msg && <Alert alert={alert} />}
              <div className="flex flex-col flex-1 justify-center mb-8 mt-2">
                <div className="w-full mt-2">
                   <FormChangePosition 
                    />
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

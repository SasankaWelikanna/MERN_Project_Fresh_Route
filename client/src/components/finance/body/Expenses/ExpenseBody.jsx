import React from 'react'
import '../main.css'
import './expense.css'

import BackToTop from '../BackToTop'
import Expense from './Expense'
import ExpenseReport from '../Expense'

const body = () => {
  return (
    <div> 
      <div className="body" id='body'>
            <div className="row">
                <div className="col-lg-6">
                {/* <ExpenseReport/> */}
                </div>
                <div className="col-lg-4">
                  <div className="col-lg-8">
                    <div className="row">
                    {/* <BudgetReport/> */}
                    </div>
                  </div>
                  <div className="col-lg-6">
                   
                  </div>
                </div>
            </div>
            <div className="row">
                <Expense />
            </div>
      </div>
   </div>
  )
}

export default body

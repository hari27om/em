import { Grid } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import MonthlyOverview from './MonthlyOverview'
import ProductsTable from './ProductsTable';

const AdminDashboard = () => {
    return (
        <div className='p-10'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>

                    <Achivement />

                </Grid>
                <Grid item xs={12} md={8}>
                    <MonthlyOverview />
                </Grid>
                <Grid item xs={12} md={8}>

                </Grid>
            </Grid>
        </div>
    )
}

export default AdminDashboard
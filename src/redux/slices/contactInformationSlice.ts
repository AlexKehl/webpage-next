import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Endpoints } from '../../../common/constants/Endpoints'
import { ContactInformationDto } from '../../../common/interface/Dto'
import { updateContactInformation } from '../../lib/api/User'
import { getItem } from '../../lib/utils/LocalStorage'
import { Cart, CartItem } from '../../types'

export interface ContactInformationState {}

const initialState: ContactInformationState = {}

const submitContactInformation = createAsyncThunk(
  Endpoints.contactInformation,
  async (data: ContactInformationDto, thunkAPI) => {
    return await updateContactInformation(data)
  }
)

export const contactInformationSlice = createSlice({
  name: 'contactInformation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitContactInformation.fulfilled, (state, action) => {})
  },
})

export const contactInformationActions = contactInformationSlice.actions
export default contactInformationSlice.reducer

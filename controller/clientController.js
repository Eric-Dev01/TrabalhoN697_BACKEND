import * as clientService from '../services/clientServices.js'

export const getClients = async (requisition, response) => {
   try {
      const clients = await clientService.getClients()
      response.status (200).json (clients)
   } catch (error) {
      console.error (`Error fetching clients: ${error}`)
      response.status (500).json ({message: 'Internal Server Error'})
   }
}

export const createClient = async (requisition, response) => {
   try {
      const clientData = requisition.body
      const newClient = await clientService.createClient (clientData)

      response.status (201).json (newClient)
   } catch (error) {
      console.error (`Error adding client: ${error}`)
      response.status (500).json ({message: 'Internal Server Error'})
   }
}

export const updateClient = async (requisition, response) => {
  try {
      const clientId = requisition.params.id
      const clientData = requisition.body
      const updatedClient = await clientService.updateClient (clientId, clientData)

      if (!updatedClient) {
         return response.status (404).json ({ message: 'Client not found' })
      }

      response.status (200).json (updatedClient)
  } catch (error) {
      console.error (`Error updating client: ${error}`)
      response.status (500).json ({ message: "Internal Server Error" })
  }
}

export const deleteClient = async (requisition, response) => {
   try {
      const clientId = requisition.params.id
      const deleted = await clientService.deleteClient (clientId)

      if (!deleted) {
         return response.status (404).json ({ message: 'Client not found' })
      }

      response.status (204).send()
   } catch (error) {
      console.error (`Error deleting client: ${error}`)
      response.status (500).json ({ message: 'Internal Server Error' })
   }
}

export const searchClients = async (requisition, response) => {
   try {
      const searchTerm = requisition.query.key
      const clients = await clientService.searchClients (searchTerm)

      response.status (200).json (clients)

   } catch (error) {
      console.error (`Error searching clients: ${error}`)
      response.status (500).json ({ message: 'Internal Server Error' })
   }
}
const db = require('../models')
const Node = db.pathNode

const saveNode = async (req, res)=>{
    const { path, data } = req.body
    if (!path || !data) {
      return res.status(400).send('Path and data are required.')
  }
  try {
     const parts = path.split('/');
    const name = parts.pop();
    let parentId = null;

    for (const part of parts) {
      let parent = await Node.findOne({ where: { name: part, parentId } });
      if (!parent) {
        parent = await Node.create({ name: part, type: 'folder', parentId });
      }
      parentId = parent.id;
    }
    const type = data ? 'file' : 'folder';

    const node = await Node.create({ name, type, parentId, data });
    console.log('Node stored:', node.toJSON());
    res.send('Node stored successfully')
  } catch (error) {
    console.error('Error storing node:', error);
    res.status(500).send('Error storing node:', error);
  }
  
}
// const fetchNodeTree = async (parentId = null) => {
//   try {
//     const nodes = await Node.findAll({ where: { parentId } })
//     return await Promise.all(
//       nodes.map(async (node) => {
//         const childNodes = await fetchNodeTree(node.id) // Pass the node ID as parentId to fetch children
//         return { ...node.toJSON(), childNodes }
//       }),
//     )
//   } catch (error) {
//     throw new Error(`Error fetching file structure: ${error.message}`)
//   }
// }

const getNode = async (req, res) => {
  const folderId = req.query.folderId

  try {
    const nodes = await Node.findAll({ where: { parentId: folderId || null } })
    nodes.map((node) => node.toJSON())
    res.status(200).json(nodes)
  } catch (error) {
    res.status(500).send(`Error fetching file structure: ${error.message}`)
    console.error(`Error fetching file structure: ${error.message}`)
  }
}

// to send node for back navigation
const getPreviousNode = async (req, res) => {
  const folderId = req.query.folderId
try {

  const nodes = await Node.findAll({ where: { id: folderId } })


  if (!nodes) {
    return res.status(404).send('Node not found')
  }

   const parentIds = [...new Set(nodes.map(node => node.parentId))];

  
  const parentNodes = await Node.findAll({ where: { id: parentIds } })

  if (!parentNodes) {
    return res.status(404).send('Parent node not found')
  }


  const parentNodesJson = parentNodes.map((parentNode) => parentNode.toJSON())
  res.status(200).json(parentNodesJson)
} catch (error) {
  res.status(500).send(`Error fetching file structure: ${error.message}`)
  console.error(`Error fetching file structure: ${error.message}`)
}
}
module.exports = {
  saveNode,
  getNode,
  getPreviousNode
}
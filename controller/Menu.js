import MenuModel from "../model/menu.mod.js";

export const getAllMenus = async (req, res) => {
  const { CONTROL_ID } = req.query
  
  const where = {}

  if (CONTROL_ID) {
    where.CONTROL_ID = CONTROL_ID
  }
  

  try {
    const menus = await MenuModel.findAll({where, order: [['ORDER', 'ASC']]});

    res.status(200).json({status: true, message: "Success get all menu", data: menus});
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const getMenuById = async (req, res) => {
  const { id } = req.params;
  try {
    const menu = await MenuModel.findByPk(id);
    if (!menu) return res.status(404).json({  status: false, message: "Menu not found" });

    res.status(200).json({status: true, message: "Success get by id menu", data: menu});
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};


export const createMenu = async (req, res) => {
  const { ...otherFields } = req.body;
  const userId = req.user?.id

  try {
    await MenuModel.create({
      ...otherFields,
      CREATED_ID: userId,
      UPDATED_ID: null,
      UPDATED_AT: null,
    });

    res.status(201).json({status: true, message: "Success create menu"});
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};


export const updateMenu = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id 

  try {
    const [updatedRowsCount] = await MenuModel.update(
      {
        ...req.body,
        UPDATED_ID: userId,
        UPDATED_AT: new Date(),
      },
      { where: { ID: id } }
    );

    if (updatedRowsCount === 0) return res.status(404).json({ status:false, message: "Menu not found" });

    res.status(200).json({status: true, message: "Success update menu"});
  } catch (error) {
    res.status(400).json({ status: false, message: error.message });
  }
};


export const deleteMenu = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRowsCount = await MenuModel.destroy({ where: { ID: id } });
    if (deletedRowsCount === 0) return res.status(404).json({ message: "Menu not found" });

    res.status(200).json({status: true, message: "Success delete menu"});
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
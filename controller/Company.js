import CompanyModel from "../model/company.mod.js";

export const getAllCompanies = async (req, res) => {
  const {CODE, COUNTRY_CODE } = req.query
  const where = {}

  if (CODE) {
    where.CODE = CODE
  }

  if (COUNTRY_CODE) {
    where.COUNTRY_CODE = COUNTRY_CODE
  }

  try {
    const companies = await CompanyModel.findAll({ where });
    res.status(200).json({status: true, message: "Success get all", data: companies});
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const getCompanyById = async (req, res) => {
  const { id } = req.params;
  try {
    const company = await CompanyModel.findByPk(id);
    if (!company) {
      return res.status(404).json({ status: false, message: "Company not found" });
    }
    res.status(200).json({status: true, message: "Success get by id", data: company});
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};


export const createCompany = async (req, res) => {
  const { ID, ...otherFields } = req.body;
  const userId = req.user.id; 

  try {
    const newCompany = await CompanyModel.create({
      ID,
      ...otherFields,
      CREATED_ID: userId,
      CREATED_AT: new Date(),
      UPDATED_ID: userId,
      UPDATED_AT: new Date(),
    });

    res.status(200).json({status: true, message: "Success create data", data: newCompany});
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};


export const updateCompany = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 

  try {
    const [updatedRowsCount] = await CompanyModel.update(
      {
        ...req.body,
        UPDATED_ID: userId,
        UPDATED_AT: new Date(),
      },
      { where: { ID: id } }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ status: false, message: "Company not found" });
    }

    const updatedCompany = await CompanyModel.findByPk(id);
    res.status(200).json({status: true, message: "Success update data", data: updatedCompany});
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
};


export const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRowsCount = await CompanyModel.destroy({ where: { ID: id } });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ status: false, message: "Company not found" });
    }

    res.status(200).json({status: true, message: "Success deleted company"});
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
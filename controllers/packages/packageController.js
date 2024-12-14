const Package = require("../../model/package")

// Get all packages
const  get_all_packages =  async (req, res) => {
    try {
        const packages = await Package.find();
        res.json(packages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch packages', error: error.message });
    }
}

const get_single_package =  async (req, res) => {
    try {
        const pkg = await Package.findById(req.params.id);
        if (!pkg) {
            return res.status(404).json({ message: 'Package not found' });
        }
        res.json(pkg);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch package', error: error.message });
    }
}


module.exports = {
    get_all_packages,
    get_single_package
};
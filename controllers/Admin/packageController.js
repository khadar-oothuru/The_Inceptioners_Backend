const Package = require("../../model/package")

// Admin credentials
const ADMIN_CREDENTIALS = { username: "admin", password: "password" };

// Admin login
const adminLogin = (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            res.json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Add a new package
const addPackage = async (req, res) => {
    try {
        const pkg = new Package(req.body);
        await pkg.save();
        res.json(pkg);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create package", error: error.message });
    }
};





// Update an existing package
const updatePackage = async (req, res) => {
    try {
        const pkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pkg) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.json(pkg);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to update package", error: error.message });
    }
};

// Delete a package
const deletePackage = async (req, res) => {
    try {
        const pkg = await Package.findByIdAndDelete(req.params.id);
        if (!pkg) {
            return res.status(404).json({ message: "Package not found" });
        }
        res.json({ message: "Package deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete package", error: error.message });
    }
};



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
    get_single_package,


    adminLogin,
    addPackage,
    updatePackage,
    deletePackage,
};

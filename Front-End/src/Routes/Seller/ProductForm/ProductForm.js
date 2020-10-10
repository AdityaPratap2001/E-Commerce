import React, { Component } from "react";
import './ProductForm.css';

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach((val) => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach((val) => {
    val === null && (valid = false);
  });

  return valid;
};

class ProductForm extends Component {
  state = {
    sellerBrand: null,
    category: 'Men',
    subcategory: 'Top-wear',
    title: null,
    type: null,
    price: null,
    stock: null,
    fit: null,
    material: null,
    selectedFile : null,
    formErrors: {
      sellerBrand: "",
      category: "",
      subcategory:"",
      title: "",
      type: "",
      price: "",
      stock: "",
      fit: "",
      material: "",
      // img : "",
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (formValid(this.state)) {

      this.props.submitHandler(this.state);
      this.setState({
        sellerBrand: null,
        category: null,
        subcategory: null,
        title: null,
        type: null,
        price: null,
        stock: null,
        fit: null,
        material: null,
        selectedFile: null,
        formErrors: {
          sellerBrand: "",
          category: "",
          subcategory:"",
          title: "",
          type: "",
          price: "",
          stock: "",
          fit: "",
          material: "",
        },
      })
    } 
    else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  fileChangedHandler = event => {
    this.setState({ selectedFile: event.target.files[0] })
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "sellerBrand":
        formErrors.sellerBrand = value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "category":
        console.log('kndjkd - '+value.length);
        formErrors.category = value.length < 2 ? "select an option" : "";
        break;
      case "subcategory":
        formErrors.subcategory = value.length < 3 ? "select an option" : "";
        break;
      case "title":
        formErrors.title =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "type":
        formErrors.type =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "price":
        formErrors.price =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "stock":
        formErrors.stock =
          value.length < 1 ? "minimum 1 characaters required" : "";
        break;
      case "fit":
        formErrors.fit =
          value.length < 1 ? "minimum 1 characaters required" : "";
        break;
      case "material":
        formErrors.material =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value });
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        <form  encType="multipart/form-data" onSubmit={this.handleSubmit} className='productform'>

          {/* <div>
            <div>Seller ID :</div>
            <div className='dataEntryDivs'>
              <input
                type="email"
                className={formErrors.sellerID.length > 0 ? "error" : null}
                name="sellerID"
                placeholder="E-Mail ID of Seller"
                onChange={this.handleChange}
                required
              />
              {formErrors.sellerID.length > 0 && (
                <span className="errorMessage">{formErrors.sellerID}</span>
              )}
            </div>
          </div> */}

          <div>
            <div>Seller Brand :</div>
            <div className='dataEntryDivs'>
            <input
              type="text"
              className={formErrors.sellerBrand.length > 0 ? "error" : null}
              name="sellerBrand"
              placeholder="Brand associated"
              onChange={this.handleChange}
              required
            />
            {formErrors.sellerBrand.length > 0 && (
              <span className="errorMessage">{formErrors.sellerBrand}</span>
            )}
            </div>
          </div>

          <div>
            <div>Product Category :</div>
            <div className='dataEntryDivs'>
            <select
              name="category"
              onChange={this.handleChange}
              className="custom-select"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Home and Living">Home & Living</option>
              <option value="Travel Trolley">Travel Bags</option>
            </select>
            {formErrors.category.length > 0 && (
              <span className="errorMessage">
                {formErrors.category}
              </span>
            )}
            </div>
          </div>
          
          <div>
            <div>Subcategory :</div>
            <div className='dataEntryDivs'>
            <select
              name="subcategory"
              onChange={this.handleChange}
              className="custom-select"
              required
            >
              <option value="Top-wear">Men Topwear</option>
              <option value="Bottom-wear">Men Bottomwear</option>
              <option value="Foot-wear">Men Footwear</option>
              <option value="Top-wear">Women Topwear</option>
              <option value="Bottom-wear">Women Bottomwear</option>
              <option value="Foot-wear">Women Footwear</option>
              <option value="Boys Clothing">Kids (Boys)</option>
              <option value="Girls Clothing">Kids (Girls)</option>
              <option value="Kids Footwear">Kids (Footwear)</option>
              <option value="Home Decor">Home (Decor)</option>
              <option value="Bed and Furnishing">Home (Bed & Furnishing)</option>
              <option value="Trolley">Travel bags</option>
            </select>
            {formErrors.subcategory.length > 0 && (
              <span className="errorMessage">
                {formErrors.subcategory}
              </span>
            )}
            </div>
          </div>

          <div>
            <div>Product Title :</div>
            <div className='dataEntryDivs'>
            <input
              type="text"
              className={formErrors.title.length > 0 ? "error" : null}
              name="title"
              placeholder="Product Title"
              onChange={this.handleChange}
              required
            />
            {formErrors.title.length > 0 && (
              <span className="errorMessage">{formErrors.title}</span>
            )}
            </div>
          </div>

          <div>
            <div>Product Type :</div>
            <div className='dataEntryDivs'>
            <input
              type="text"
              className={formErrors.type.length > 0 ? "error" : null}
              name="type"
              placeholder="Product Type"
              onChange={this.handleChange}
              required
            />
            {formErrors.type.length > 0 && (
              <span className="errorMessage">{formErrors.type}</span>
            )}
            </div>
          </div> 

          <div>
            <div>Price :</div>
            <div className='dataEntryDivs'>
            <input
              type="number"
              className={formErrors.price.length > 0 ? "error" : null}
              name="price"
              placeholder="Product Price"
              onChange={this.handleChange}
              required
            />
            {formErrors.price.length > 0 && (
              <span className="errorMessage">{formErrors.price}</span>
            )}
            </div>
          </div>

          <div>
            <div>Stock :</div>
            <div className='dataEntryDivs'>
            <input
              type="number"
              className={formErrors.stock.length > 0 ? "error" : null}
              name="stock"
              placeholder="Number of Products available"
              onChange={this.handleChange}
              required
            />
            {formErrors.stock.length > 0 && (
              <span className="errorMessage">{formErrors.stock}</span>
            )}
            </div>
          </div>

          <div>
            <div>Fit :</div>
            <div className='dataEntryDivs'>
            <input
              type="text"
              className={formErrors.fit.length > 0 ? "error" : null}
              name="fit"
              placeholder="Product fit"
              onChange={this.handleChange}
              required
            />
            {formErrors.fit.length > 0 && (
              <span className="errorMessage">{formErrors.fit}</span>
            )}
            </div>
          </div> 

          <div>
            <div>Material :</div>
            <div className='dataEntryDivs'>
            <input
              type="text"
              className={formErrors.material.length > 0 ? "error" : null}
              name="material"
              placeholder="Product Material"
              onChange={this.handleChange}
              required
            />
            {formErrors.material.length > 0 && (
              <span className="errorMessage">{formErrors.material}</span>
            )}
            </div>
          </div> 

          <div>
            <div>Upload Img : </div>
            <div className='dataEntryDivs imgUpload'>
              <input name='img' required onChange={this.fileChangedHandler} type='file'></input>
            </div>
          </div>

          <button type="submit" style={{width : '50%',marginTop : '10px'}} className="btn btn-primary">Submit</button>
        
        </form>
      </div>
    );
  }
}

export default ProductForm;

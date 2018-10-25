import React from 'react';
import axios from 'axios';
import { resize } from '../lib/tool'


class Test extends React.Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = new FormData(e.target);

    data.append('user_id', 'test');
    data.append('path', 'articles');

    const reader = new FileReader();
    reader.onload = e => {
      const image = new Image();
      image.className = 'img-item';
      image.src = e.target.result;
      image.onload = imageEvent => {
        data.append('image', resize(image).blob, data.get('image_upload').name);
        axios.post('/api/images', data)
          .then((res) => console.log(res))
      }
    }
    reader.readAsDataURL(data.get('image_upload'));
    console.log("data",data.get('image_upload'));
  }

  handleChange(e) {
    const file = e.target.files[0];

  }

  render() {
    return(
      <form onSubmit={this.handleSubmit} method="post" encType="multipart/form-data">
          <div className="form-group">
              <label htmlFor="exampleInputFile">File input</label>
              <input type="file" name="image_upload" id="exampleInputFile"
                onChange={this.handleChange}
              />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}

export default Test;
import {PureComponent} from "react";
import {connect} from "react-redux";

class Home extends PureComponent {
  render() {
    return (
        <div>
          home page
        </div>
    );
  }
}

const mapStateToProps = (state)=>({

})

const mapDispatchToProps=(dispatch)=>({

})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
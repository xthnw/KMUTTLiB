import React, { Component, } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  TextInput,
  Modal,
} from "react-native";
import { ScrollView, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import IconM from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from './customStyles/ReservationRequestStyles';

export default class ReservationRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: "", // Student ID input value
      name: "", // Name input value

      isDropdownOpen: false,
      selectedOption: "",

      isModalVisible: false,
      isModalCompleteVisible: false,
    };
    this.inputBoxRef = React.createRef();
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible }, () => {
      // After the modal state is updated, check if it's closed
      if (!this.state.isModalVisible) {
        // Call the function you want when the modal is closed
        this.toggleModalComplete();
      }
    });
  };

  toggleModalComplete = () => {
    this.setState({
      isModalCompleteVisible: !this.state.isModalCompleteVisible,
    });
  };
  toggleModalClose = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };
  toggleDropdown = () => {
    this.setState((prevState) => ({
      isDropdownOpen: !prevState.isDropdownOpen,
    }));
  };
  selectOption = (option) => {
    this.setState({
      selectedOption: option,
      isDropdownOpen: false, // Close the dropdown after selection
    });
  };
  handleBackPress = () => {
    this.props.navigation.goBack(); // Assuming you receive navigation prop from a navigator
  };

  render() {
    const { selectedOption, isDropdownOpen } = this.state;
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
    const dropdownHeight = isDropdownOpen ? options.length * 40 : 0;
    const handleSubmission = () => {
      // Handle the submission logic here
    };
    const { isModalVisible } = this.state;
    const { isModalCompleteVisible } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 10 }}>
        <View>
          <View style={styles.contentContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollViewContainer}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={this.handleBackPress}
                style={styles.backcirclebutton}
              >
                <View style={styles.subbackcirclebutton}>
                  <IconM name="keyboard-arrow-left" size={30} color="orange" />
                </View>
              </TouchableOpacity>
              <Text style={styles.formTitle}>Library Request</Text>
              <Text style={styles.detailsText}>
                KMUTT-LIB ROOM 1 | Time : 10:30 - 12:20 | 24 Oct 2023
              </Text>

              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Student ID
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Student ID"
                    onChangeText={(text) => this.setState({ studentID: text })}
                    value={this.state.studentID}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Name"
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                  />
                </View>
              </View>
              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>
                    Service group
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Bachelor"
                    onChangeText={(text) => this.setState({ Service: text })}
                    value={this.state.Service}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Department</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Computer Engineering"
                    onChangeText={(text) => this.setState({ Department: text })}
                    value={this.state.Department}
                  />
                </View>
              </View>

              <View style={styles.dropdownOptionView}>
                <Text style={styles.label}>
                  Request for
                </Text>
                <TouchableOpacity
                  style={styles.waitforDropdownOptionContainer}
                  onPress={this.toggleDropdown}
                >
                  <Text
                    style={{ color: "#666666", fontFamily: "LeagueSpartan" }}
                  >
                    {selectedOption || "Select an option"}
                  </Text>
                  <Icon name="angle-down" size={20} color="orange" />
                </TouchableOpacity>
                {isDropdownOpen && (
                  <View style={[styles.dropdownOptionContainer, { height: dropdownHeight }]}>
                    {options.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={styles.subDropdownOptionContainer}
                        onPress={() => this.selectOption(option)}
                      >
                        <Text
                          style={[{ color: "gray", fontFamily: "LeagueSpartan", }]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={styles.studentIdformPadding}>
                <Text style={styles.label}>
                  Please Specify: Username/Student ID
                </Text>
                <View style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>
                    1.
                  </Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=""
                  />
                </View>
                <View style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>
                    2.
                  </Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=""
                  />
                </View>
                <View style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>
                    3.
                  </Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=""
                  />
                </View>
                <View style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>
                    4.
                  </Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=""
                  />
                </View>
                <View style={styles.studentIdrowInput}>
                  <Text style={styles.numberInfrontstudentIdrowInput}>
                    5.
                  </Text>
                  <TextInput
                    style={styles.studentIdInputboxContainer}
                    placeholder=""
                  />
                </View>

              </View>

              <View style={styles.submitButtonView}>
                <TouchableOpacity
                  style={styles.submitButtonStyle}
                  onPress={this.toggleModal}
                >
                  <Text style={styles.submitTextStyle}>
                    Submit
                  </Text>
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}
                >
                  <View style={styles.blankBgModalView}>
                    <View style={styles.alertModalcontainer}>
                      <TouchableOpacity
                        onPress={this.toggleModalClose}
                        style={styles.closebuttonView}
                      >
                        <Ionicons name="close" size={32} color="orange" />
                      </TouchableOpacity>
                      <View style={[{ padding: 16, alignItems: "center" }]}>
                        <Icon
                          name="exclamation-triangle"
                          size={24}
                          color="red"
                        />
                        <Text style={styles.alertheaderText}>
                          คำเตือน
                        </Text>
                        <Text style={styles.alertdetailsText}>
                          1.
                          หากมีอุปกรณ์ชำรุดเสียหายจะถือเป็นความรับผิดชอบของผู้ใช้บริการห้อง
                          KM โปรเจ็คเตอร์ มูลค่า 100,000 บาท
                        </Text>
                        <Text style={styles.alertdetailsText}>
                          2. การขีด/เขียนบนผนังห้อง มูลค่า 9,000 บาท ยกเว้นห้อง
                          KM5 สามารถเขียนติวได้ (ต้องเป็นปากกาที่สามารถลบออกได้เท่านั้น)
                        </Text>
                        <TouchableOpacity
                          style={styles.acceptbuttonStyle}
                          onPress={this.toggleModal}
                        >
                          <Text style={styles.acceptTextStyle}>
                            Accept
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Modal>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalCompleteVisible}
                >
                  <View style={styles.blankBgModalView}>
                    <View style={styles.sucessModalcontainer}>
                      <TouchableOpacity
                        onPress={this.toggleModalComplete}
                        style={styles.closebuttonView}
                      >
                        <Ionicons name="close" size={32} color="orange" />
                      </TouchableOpacity>
                      <View style={styles.paddingViewforinsideModal}>
                        <Image
                          source={require("./picture/check.png")}
                          style={{ width: 50, height: 50 }}
                        />
                        <Text style={styles.sucessTextStyle}>
                          Reserve Room Successfully!
                        </Text>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
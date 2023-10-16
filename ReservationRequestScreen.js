import { style } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
import React, { Component, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Animated,
  TextInput,
  Modal,
  UIManager,
  findNodeHandle,
} from "react-native";
import { ScrollView, Image } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import Gradient from "./Gradient"; // Import the Gradient component
import { LinearGradient } from "expo-linear-gradient";
import { customText } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import IconM from "react-native-vector-icons/MaterialIcons";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

// Define a scaling factor based on your design or preferences
const scalingFactor = 0.04; // You can adjust this value

// Calculate the responsive font size
const fontSize = screenWidth * scalingFactor;

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

  handleBoxPress = (boxNumber) => {
    // Implement your logic here when a box is clicked
    // alert(`Box ${boxNumber} clicked!`);
    // Navigate to ReservationDetailsScreen
    this.props.navigation.navigate("ReservationDetails");
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
    const { width, height } = Dimensions.get("window");
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
                style={[
                  {
                    width: 40,
                    height: 40,
                    borderRadius: 20, // Half of the width/height to create a circle
                    backgroundColor: "white",
                    borderColor: "#e7e7e7",
                    borderWidth: 0.5,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.1,
                    shadowRadius: 1,
                  },
                ]}
              >
                <View
                  style={[
                    {
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  ]}
                >
                  <IconM name="keyboard-arrow-left" size={30} color="orange" />
                </View>
              </TouchableOpacity>
              <Text style={styles.formTitle}>Library Request</Text>
              <Text style={styles.detailsText}>
                KMUTT-LIB ROOM 1 | Time : 10:30 - 12:20 | 24 Oct 2023
              </Text>

              <View style={styles.inputRow}>
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { marginBottom: 10 }]}>
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
                  <Text style={[styles.label, { marginBottom: 10 }]}>Name</Text>
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
                  <Text style={[styles.label, { marginBottom: 10 }]}>
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
                  <Text style={[styles.label, { marginBottom: 10 }]}>Department</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Computer Engineering"
                    onChangeText={(text) => this.setState({ Department: text })}
                    value={this.state.Department}
                  />
                </View>
              </View>

              <View
                style={[
                  {
                    flexDirection: "column",
                    marginBottom: 20,
                  },
                ]}
              >
                <Text
                  style={[
                    {
                      marginRight: 10,
                      fontSize: 16,
                      fontFamily: "LeagueSpartan",
                      marginBottom: 10,
                    },
                  ]}
                >
                  Request for
                </Text>
                <TouchableOpacity
                  style={[
                    {
                      flex: 1,
                      borderWidth: 2,
                      borderColor: "#e7e7e7",
                      borderRadius: 15,
                      backgroundColor: "white",
                      padding: 10,
                      flexDirection: "row", // Add flexDirection to align icon and text horizontally
                      justifyContent: "space-between", // Add this to space out icon and text
                      alignItems: "center", // Center items vertically
                    },
                  ]}
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
                  <View
                    style={[
                      {
                        top: "5%",
                        left: 0,
                        right: 0,
                        borderWidth: 2,
                        borderColor: "#e7e7e7",
                        borderRadius: 15,
                        backgroundColor: "white",
                        overflow: "hidden",
                        height: dropdownHeight,
                        fontFamily: "LeagueSpartan",
                      },
                    ]}
                  >
                    {options.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          {
                            padding: 12,
                            borderBottomWidth: 0,
                            borderBottomColor: "gray",
                          },
                        ]}
                        onPress={() => this.selectOption(option)}
                      >
                        <Text
                          style={[
                            {
                              color: "gray",
                              fontSize: 14,
                              fontFamily: "LeagueSpartan",
                            },
                          ]}
                        >
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View style={[{ padding: 16 }]}>
                <Text
                  style={[
                    {
                      marginRight: 10,
                      fontSize: 16,
                      fontFamily: "LeagueSpartan",
                      marginBottom: 10,
                    },
                  ]}
                >
                  Please Specify: Username/Student ID
                </Text>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        fontSize: 18,
                        fontFamily: "LeagueSpartan",
                        marginRight: 10,
                      },
                    ]}
                  >
                    1.
                  </Text>
                  <TextInput
                    style={[
                      {
                        flex: 1,
                        borderColor: "#e7e7e7",
                        borderWidth: 2,
                        backgroundColor: "white",
                        borderRadius: 15,
                        padding: 10,
                      },
                    ]}
                    placeholder=""
                  />
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        fontSize: 18,
                        fontFamily: "LeagueSpartan",
                        marginRight: 10,
                      },
                    ]}
                  >
                    2.
                  </Text>
                  <TextInput
                    style={[
                      {
                        flex: 1,
                        borderColor: "#e7e7e7",
                        borderWidth: 2,
                        backgroundColor: "white",
                        borderRadius: 15,
                        padding: 10,
                      },
                    ]}
                    placeholder=""
                  />
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        fontSize: 18,
                        fontFamily: "LeagueSpartan",
                        marginRight: 10,
                      },
                    ]}
                  >
                    3.
                  </Text>
                  <TextInput
                    style={[
                      {
                        flex: 1,
                        borderColor: "#e7e7e7",
                        borderWidth: 2,
                        backgroundColor: "white",
                        borderRadius: 15,
                        padding: 10,
                      },
                    ]}
                    placeholder=""
                  />
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        fontSize: 18,
                        fontFamily: "LeagueSpartan",
                        marginRight: 10,
                      },
                    ]}
                  >
                    4.
                  </Text>
                  <TextInput
                    style={[
                      {
                        flex: 1,
                        borderColor: "#e7e7e7",
                        borderWidth: 2,
                        backgroundColor: "white",
                        borderRadius: 15,
                        padding: 10,
                      },
                    ]}
                    placeholder=""
                  />
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 10,
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        fontSize: 18,
                        fontFamily: "LeagueSpartan",
                        marginRight: 10,
                      },
                    ]}
                  >
                    5.
                  </Text>
                  <TextInput
                    style={[
                      {
                        flex: 1,
                        borderColor: "#e7e7e7",
                        borderWidth: 2,
                        backgroundColor: "white",
                        borderRadius: 15,
                        padding: 10,
                      },
                    ]}
                    placeholder=""
                  />
                </View>
              </View>

              <View
                style={[
                  {
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
              >
                {/* Other content goes here */}
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: "orange",
                      padding: 16,
                      borderRadius: 15,
                      width: "80%",
                    },
                  ]}
                  onPress={this.toggleModal}
                >
                  <Text
                    style={[
                      {
                        color: "white",
                        fontSize: 16,
                        fontFamily: "LeagueSpartanSemiBold",
                        textAlign: "center",
                      },
                    ]}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>

                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={isModalVisible}
                >
                  <View
                    style={[
                      {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                      },
                    ]}
                  >
                    <View
                      style={[
                        {
                          justifyContent: "center",
                          alignItems: "center",
                          width: height * 0.4,
                          maxHeight: height * 0.7,
                          backgroundColor: "white",
                          borderRadius: 35,
                          borderWidth: 2,
                          borderColor: "#e7e7e7",
                          elevation: 8,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                          overflow: "hidden",
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={this.toggleModalClose}
                        style={[
                          {
                            position: "absolute",
                            top: 16,
                            right: 16,
                            zIndex: 1, // Ensure the icon is displayed above the map
                          },
                        ]}
                      >
                        <Ionicons name="close" size={32} color="orange" />
                      </TouchableOpacity>
                      <View style={[{ padding: 16, alignItems: "center" }]}>
                        <Icon
                          name="exclamation-triangle"
                          size={24}
                          color="red"
                        />
                        <Text
                          style={[
                            {
                              fontSize: 18,
                              fontFamily: "IBMPlexSansThaiBold",
                              textAlign: "center",
                              color: "red",
                            },
                          ]}
                        >
                          คำเตือน
                        </Text>
                        <Text
                          style={[
                            {
                              fontSize: 14,
                              fontFamily: "IBMPlexSansThaiSemiBold",
                              textAlign: "center",
                              marginTop: 16,
                            },
                          ]}
                        >
                          1.
                          หากมีอุปกรณ์ชำรุดเสียหายจะถือเป็นความรับผิดชอบของผู้ใช้บริการห้อง
                          KM โปรเจ็คเตอร์ มูลค่า 100,000 บาท
                        </Text>
                        <Text
                          style={[
                            {
                              fontSize: 14,
                              fontFamily: "IBMPlexSansThaiSemiBold",
                              textAlign: "center",
                              marginTop: 16,
                            },
                          ]}
                        >
                          2. การขีด/เขียนบนผนังห้อง มูลค่า 9,000 บาท ยกเว้นห้อง
                          KM5 สามารถเขียนติวได้
                          (ต้องเป็นปากกาที่สามารถลบออกได้เท่านั้น)
                        </Text>
                        <TouchableOpacity
                          style={[
                            {
                              backgroundColor: "orange",
                              padding: 12,
                              borderRadius: 20,
                              marginTop: 16,
                            },
                          ]}
                          onPress={this.toggleModal}
                        >
                          <Text
                            style={[
                              {
                                color: "white",
                                fontSize: 16,
                                fontFamily: "LeagueSpartanSemiBold",
                                textAlign: "center",
                              },
                            ]}
                          >
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
                  <View
                    style={[
                      {
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0)",
                      },
                    ]}
                  >
                    <View
                      style={[
                        {
                          justifyContent: "center",
                          alignItems: "center",
                          width: height * 0.4,
                          height: height * 0.3,
                          backgroundColor: "white",
                          borderRadius: 35,
                          elevation: 8,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.2,
                          shadowRadius: 4,
                        },
                      ]}
                    >
                      <TouchableOpacity
                        onPress={this.toggleModalComplete}
                        style={[
                          {
                            position: "absolute",
                            top: 16,
                            right: 16,
                            zIndex: 1, // Ensure the icon is displayed above the map
                          },
                        ]}
                      >
                        <Ionicons name="close" size={32} color="orange" />
                      </TouchableOpacity>
                      <View style={[{ padding: 16, alignItems: "center" }]}>
                        <Image
                          source={require("./picture/check.png")}
                          style={{ width: 50, height: 50 }}
                        />
                        <Text
                          style={[
                            {
                              fontSize: 18,
                              fontFamily: "LeagueSpartan",
                              textAlign: "center",
                              color: "#32ba7c",
                              marginTop: 16,
                            },
                          ]}
                        >
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

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contentContainer: {
    backgroundColor: "#fbfbfb",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  formTitle: {
    fontSize: 24,
    fontFamily: "LeagueSpartanSemiBold",
    color: "black",
    marginBottom: 10,
  },
  detailsText: {
    color: "orange",
    marginBottom: 20,
    fontFamily: "LeagueSpartanMedium",
  },
  inputRow: {
    flexDirection: "row", // Arrange inputs horizontally
    justifyContent: "space-between", // Add space between inputs
  },
  inputContainer: {
    marginBottom: 20, //ยืด Container ขาว ๆ ลงล่าง
  },
  label: {
    fontSize: 16,
    fontFamily: "LeagueSpartan",
  },
  input: {
    borderWidth: 2,
    borderColor: "#e7e7e7",
    backgroundColor: "white",
    borderRadius: 15,
    padding: "3%",
    fontSize: 16,
    fontFamily: "LeagueSpartan",
    height: 40,
    width: screenWidth * 0.35,
  },
});

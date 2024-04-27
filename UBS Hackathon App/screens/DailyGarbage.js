import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import { React } from 'react'
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection, query, where, getDoc, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { FIRESTORE_DB } from '../firebase';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import Markdown from 'react-native-markdown-display';
import StatusBar from '../components/StatusBar';

const DailyGarbage = ({route}) => {

  const [selectedCategory, setSelectedCategory] = useState('Biodegradable');
  const [amount, setAmount] = useState('0')
  const user = route.params[0]
  const navigation = useNavigation()

  const [chartData, setChartData] = useState({
    labels: ["dry", "wet"],
    datasets: [
      {
        data: [0, 0],
        colors:[
          (opacity=1) => '#1E90FF',
          (opacity=1) => '#008000'
          

        ]
      }
    ]
  })

  const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year;//format: d-m-y;
  }

  const quotes = [
    "**Bin Buddy Reminder:** *Hey there, Bin Buddy! Your trash bin is feeling a bit lonely. Time to give it some love with Swachh Sanket and make waste management a breeze!*",
    "**Green Goals Alert:** *Wake up and smell the compost! It's time to set some green goals with Swachh Sanket and turn waste management into a winning habit.*",
    "**Waste Whisperer Wisdom:** *Listen closely... do you hear that? It's the sound of your trash bin calling out for some eco-friendly action. Answer the call with Swachh Sanket and become a waste whisperer!*",
    "**Trash Talk Time:** *Feeling trashy? Let's talk! Swachh Sanket is here to turn your waste woes into waste WOWs. Join the conversation and let's make waste management a topic worth talking about!*",
    "**Recycling Rally Cry:** *Attention all waste warriors! It's time to rally together and conquer the recycling realm with Swachh Sanket. Let's turn trash into triumph and make the planet proud!*",
    "**Eco-Friendly Encouragement:** *Feeling green around the edges? Embrace the eco-friendly vibes with Swachh Sanket and let's make waste management as cool as compost!*",
    "**Bin Brilliance Boost:** *Your trash bin called. It wants to be more than just a receptacle. Let Swachh Sanket transform it into a beacon of waste brilliance. Let's give your bin the glow-up it deserves!*",
    "**Landfill Liberation:** *Break free from landfill limbo! Join the waste revolution with Swachh Sanket and let's pave the way to a landfill-free future. It's time to unleash your inner eco-warrior!*",
    "**Waste Warrior Wisdom:** *Ready to be a hero in the battle against waste? Swachh Sanket is your trusty sidekick, here to guide you on a mission to save the planet, one recycled item at a time!*",
    "**Trashy Transformation:** *From trash to treasure, your waste journey starts here! Let Swachh Sanket be your guide as we embark on an eco-friendly adventure together. Together, we'll make waste management a breeze!*",
    "**Bin Banter Boost:** *Your trash bin has a secret... it wants to be your bestie! Let Swachh Sanket help you two become inseparable. Say hello to a waste management buddy!*",
    "**Waste Wizard Wisdom:** *Abracadabra! With Swachh Sanket, you're a certified waste wizard. Cast your eco-friendly spells and watch as waste disappears like magic!*",
    "**Trash Transformation Time:** *Ready for a trashy makeover? Let Swachh Sanket be your style guide as we transform waste bins from drab to fab. It's time to sparkle and shine!*",
    "**Eco-Enthusiast Encouragement:** *High-five to all our eco-enthusiasts out there! Let's keep the momentum going with Swachh Sanket and show the world that green is the new black!*",
    "**Bin Buddy Bash:** *It's a bin-tastic party and your trash bin is the guest of honor! Let Swachh Sanket bring the snacks (and the sustainability) as we celebrate waste management in style.*",
    "**Green Goals Galore:** *Dream big, recycle bigger! With Swachh Sanket by your side, there's no limit to the eco-friendly goals you can achieve. Let's aim for the stars and beyond!*",
    "**Trash Talk Time:** *Got trash? Let's chat! Swachh Sanket is here to turn trash talk into action. Join the conversation and let's make waste management a trending topic!*",
    "**Recycling Revolution Rally:** *Calling all recycling rebels! It's time to join forces with Swachh Sanket and lead the charge for a greener future. Together, we'll make waste management history!*",
    "**Eco-Friendly Evolution:** *Embrace the evolution of eco-friendly! With Swachh Sanket, you'll level up your waste management game and become a sustainability superstar in no time.*",
    "**Landfill Liberation League:** *Break free from landfill limitations! Join the Swachh Sanket Liberation League and let's liberate waste from its earthly confines. Together, we'll pave the way to a landfill-free world!*",
    "**Waste Warrior Wonder:** *Ready to unleash your inner waste warrior? With Swachh Sanket as your guide, you'll conquer waste like a champ and inspire others to do the same!*",
    "**Trashy Tales:** *Once upon a time, there was a trash bin longing for a purpose. Then along came Swachh Sanket, and the rest is eco-friendly history. Let's create our own trashy tale!*",
    "**Bin Brilliance Bonanza:** *Your trash bin called. It wants to be more than just a receptacle. Let Swachh Sanket transform it into a beacon of brilliance. Let's give your bin the glow-up it deserves!*",
    "**Eco-Excitement Extravaganza:** *Get ready for an eco-excursion like no other! With Swachh Sanket as your guide, you'll embark on a journey of sustainability and discover the thrill of waste management wonders!*",
    "**Waste-Free Wonders:** *Imagine a world without waste. With Swachh Sanket, it's not just a dream—it's a possibility. Let's turn imagination into reality and make waste disappear like magic!*",
    "**Eco-Enlightenment:** *Unlock the secrets of sustainability with Swachh Sanket. From recycling revelations to waste management wisdom, you'll become an eco-enlightened guru in no time!*",
    "**Bin Buddy Brigade:** *Join the Bin Buddy Brigade and become a waste management warrior with Swachh Sanket! Together, we'll conquer trash and create a cleaner, greener world for all.*",
    "**Trash Transformation Team:** *Transform trash into treasure with Swachh Sanket! Join our waste management team and discover the power of turning waste into wonderful opportunities.*",
    "**Eco-Friendly Expedition:** *Embark on an eco-friendly expedition with Swachh Sanket! From recycling adventures to waste reduction quests, you'll explore the wonders of sustainability like never before.*",
    "**Trash Talk Triumph:** *Turn trash talk into triumph with Swachh Sanket! Let's elevate waste management conversations and inspire others to join the eco-friendly movement. Together, we'll make a difference!*"
];

function getQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}




  const fetchData = async () => {
    try {
      const currentDate = getCurrentDate();
      const q = query(
        collection(FIRESTORE_DB, 'dailyGarbage'),
        where('user', '==', user),
        where('date', '==', currentDate)
      );

      const querySnapshot = await getDocs(q);
      let data = null;

      querySnapshot.forEach((doc) => {
        // Assuming there's only one document matching the conditions
        data = doc.data();
      });

      const garbage = data ? data["garbage"] : {}; 

      let dry = 0;
      let wet = 0;

      for (const [key, value] of Object.entries(garbage)) {
        if (key === "Biodegradable") {
          wet += value;
        } else {
          dry += value;
        }
      }

      setChartData({
        labels: ["dry", "wet"],
        datasets: [
          {
            data: [dry, wet]
          }
        ]
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const sendUserData = async () => {
    const currentDate = getCurrentDate();
    const userDocRef = doc(FIRESTORE_DB, 'dailyGarbage', user);

    // Check if the document already exists for the current user and date
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // If the document exists, update the selected quantity for the selected category
      const userData = userDocSnapshot.data();
      const currentGarbage = userData.garbage || {};

      if (currentGarbage[selectedCategory]) {
        // If the category already exists, add the amount to the existing amount
        currentGarbage[selectedCategory] += parseInt(amount);
      } else {
        // If the category doesn't exist, set the amount for the category
        currentGarbage[selectedCategory] = parseInt(amount);
      }

      await setDoc(userDocRef, { garbage: currentGarbage }, { merge: true });
    } else {
      // If the document doesn't exist, create a new document
      await setDoc(userDocRef, {
        date: currentDate,
        user: user,
        garbage: {
          [selectedCategory]: parseInt(amount)
        }
      });
    }

    fetchData()
    // const nav = () => { navigation.navigate("DailyGarbage") }
    // nav()
  }



  return (
    <View style={{ paddingTop: 50, alignItems: 'center',backgroundColor: '#Bad373',flex:1 }}>
      <Text style={{ fontSize: 30, marginTop: 20, fontWeight: 'bold',marginBottom:20 }}>Daily Garbage </Text>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Picker
        style={{ width: 200, borderWidth:2, borderColor:'black',backgroundColor: '#F7F6BB',color:'black' }}
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedCategory(itemValue)
        }>
        <Picker.Item label="Biodegradable" value="Biodegradable" />
        <Picker.Item label="Paper" value="Paper" />
        <Picker.Item label="Plastic" value="Plastic" />
        <Picker.Item label="Cardboard" value="Cardboard" />
        <Picker.Item label="Metal" value="Metal" />
        <Picker.Item label="Glass" value="Glass" />
      </Picker>
      
      <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginHorizontal: 10 }}>Amount</Text>
        <TextInput
          style={{ backgroundColor: '#F7F6BB', width: 50, paddingHorizontal: 10, borderRadius: 5, color: 'black' }}
          type="text"
          value={amount}
          onChangeText={setAmount}
        />

      </View>
      
      </View>

      
      <Text>{}</Text>

      <Pressable onPress={sendUserData} style={{ fontSize: 15,fontWeight:'bold', marginTop: 0, color: 'black', backgroundColor: '#F7F6BB', padding: 10, borderRadius: 5, width: 100,height:50 }}>
        <Text style={{color:'black', fontWeight:'bold',textAlign:'center',fontSize:18}}>Save</Text>
      </Pressable>

      <BarChart
        data={chartData}
        width={300}
        height={270}
        fromZero={true}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        withCustomBarColorFromData = {true}
        style={{
          marginTop: 50,
          borderRadius: 16,
          borderWidth: 1
        }}
      />
      <Text>{getCurrentDate()}</Text>
      <View style={{marginHorizontal : 34}}><Markdown >{getQuote()}</Markdown></View>

      <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#3ab570', // Change this to your desired background color
                height: 70, // Change this to your desired height
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <StatusBar email={user} />
            </View>
      
    </View>
  );
}

export default DailyGarbage
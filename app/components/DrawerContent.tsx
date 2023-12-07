import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";

import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

function DrawerContent(props: any) {
  const { session } = useAuth();
  async function logOut() {
    try {
      const { error } = await supabase.auth.signOut();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {session ? (
        <DrawerItem
          label="Sign out"
          onPress={() => {
            logOut();
            props.navigation.closeDrawer();
          }}
        />
      ) : (
        <></>
      )}
    </DrawerContentScrollView>
  );
}

export default DrawerContent;

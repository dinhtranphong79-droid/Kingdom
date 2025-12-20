// /shared/summary.service.js
import { doc, getDoc, setDoc, serverTimestamp } from
  "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

import { TABS } from "./tabs.config.js";

export async function recomputeSummaryTotal(db, uid){
  const ref = doc(db, "accounts", uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const tabsData = snap.data()?.tabsData || {};

  let total = 0;
  for (const t of TABS){
    total += Number(tabsData[t.key]?.totalPoints || 0);
  }

  await setDoc(ref, {
    tabsData: {
      summary: {
        totalPoints: total,
        updatedAt: serverTimestamp()
      }
    }
  }, { merge: true });
}

const chargeLevel = document.getElementById("charge-level");
      const charge = document.getElementById("charge");
      const chargingStatusRef = document.getElementById("charging-status");

      window.onload = () => {
        //For browsers that don't support the Battery Status 
        if (!navigator.getBattery) {
          alert("Battery Status API is not supported in your browser");
          return false;
        }
      };

      navigator.getBattery().then((battery) => {
        /* Update all the battery information which is a combination of multiple functions */
        function updateAllBatteryInfo() {
          updateChargingInfo();
          updateLevelInfo();
        }
        updateAllBatteryInfo();

        // When the charging status changes
        battery.addEventListener("chargingchange", () => {
          updateAllBatteryInfo();
        });

        // When the Battery Level Changes
        battery.addEventListener("levelchange", () => {
          updateAllBatteryInfo();
        });

        //Updating the battery Level
        function updateLevelInfo() {
          batteryLevel = `${parseInt(battery.level * 100)}%`;
          charge.style.width = batteryLevel;
          chargeLevel.textContent = batteryLevel;
        }

        //Updating the charging status
        function updateChargingInfo() {
          if (battery.charging) {
            charge.classList.add("active");
            chargingStatusRef.innerHTML = "Device Is <span>Charging</span>";
          } else {
            charge.classList.remove("active");
            chargingStatusRef.innerHTML = "Device Is <span>Not Charging</span>";
          }
        }
      });
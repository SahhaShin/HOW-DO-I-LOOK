package com.ssafy.howdoilook.domain.clothesOotd.entity;

public enum SlotType implements SlotTypeInterface {
    TOP {
        @Override
        public SlotType getSlotType() {
            return SlotType.TOP;
        }
    },
    BOTTOM {
        @Override
        public SlotType getSlotType() {
            return SlotType.BOTTOM;
        }
    },
    SHOE {
        @Override
        public SlotType getSlotType() {
            return SlotType.SHOE;
        }
    },
    ACCESSORY1 {
        @Override
        public SlotType getSlotType() {
            return SlotType.ACCESSORY1;
        }
    },
    ACCESSORY2 {
        @Override
        public SlotType getSlotType() {
            return SlotType.ACCESSORY2;
        }
    },
    ACCESSORY3 {
        @Override
        public SlotType getSlotType() {
            return SlotType.ACCESSORY3;
        }
    }
}


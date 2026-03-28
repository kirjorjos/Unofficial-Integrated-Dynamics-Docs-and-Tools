import { operatorRegistry } from "lib/IntegratedDynamicsClasses/registries/operatorRegistry";
import { iBoolean } from "lib/IntegratedDynamicsClasses/typeWrappers/iBoolean";
import { Integer } from "lib/JavaNumberClasses/Integer";
import {
  ValueTypeListProxyFactories,
  ValueTypeListProxyAppend,
  ValueTypeListProxyConcat,
  ValueTypeListProxyLazyBuilt,
  ValueTypeListProxyMaterialized,
  ValueTypeListProxyNbtKeys,
  ValueTypeListProxyNbtValueListByte,
  ValueTypeListProxyNbtValueListInt,
  ValueTypeListProxyNbtValueListTag,
  ValueTypeListProxyOperatorMapped,
  IValueTypeListProxy,
} from "lib/IntegratedDynamicsClasses/ValueTypeListProxy";
import { CompoundTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/CompoundTag";
import { IntTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntTag";
import { ByteArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ByteArrayTag";
import { IntArrayTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/IntArrayTag";
import { ListTag } from "lib/IntegratedDynamicsClasses/NBTFunctions/MinecraftClasses/ListTag";
import { iArrayEager } from "lib/IntegratedDynamicsClasses/typeWrappers/iArrayEager";
import { Operator } from "lib/IntegratedDynamicsClasses/operators/Operator";

/**
 * Test the factory types of value list proxies.
 * Transpiled from github.com/CyclopsMC/IntegratedDynamics with minimal changes
 * @transpiler kirjorjos
 * @originalAuthor rubensworks
 */

// Mock the CyclopsCoreInstance
const CyclopsCoreInstance = { MOD: {} };
class ModBaseMocked {}
CyclopsCoreInstance.MOD = new ModBaseMocked();

describe("TestValueTypeListProxyFactories", () => {
  beforeAll(() => {
    ValueTypeListProxyFactories.load();
  });

  const testFactoryType = (proxy: IValueTypeListProxy<any, any>) => {
    const serialized = ValueTypeListProxyFactories.serialize(proxy);
    const proxyNew = ValueTypeListProxyFactories.deserialize(serialized);
    if (!proxy.isInfinite()) {
      expect(proxyNew.getProxyName()).toBe(proxy.getProxyName());
    } else {
      expect(proxyNew.getProxyName()).toBe(proxy.getProxyName());
    }
  };

  it("testAppend", () => {
    const list = new ValueTypeListProxyMaterialized([new iBoolean(true)]);
    testFactoryType(new ValueTypeListProxyAppend(list, new iBoolean(true)));
  });

  it("testConcat", () => {
    const list1 = new ValueTypeListProxyMaterialized([new iBoolean(true)]);
    const list2 = new ValueTypeListProxyMaterialized([new iBoolean(true)]);
    testFactoryType(new ValueTypeListProxyConcat(list1, list2));
  });

  it("testLazyBuilt", () => {
    testFactoryType(
      new ValueTypeListProxyLazyBuilt(
        new Integer(0),
        new operatorRegistry.ARITHMETIC_ADDITION() as unknown as Operator<
          Integer,
          Integer
        >
      )
    );
  });

  it("testMaterialized", () => {
    testFactoryType(new ValueTypeListProxyMaterialized([new iBoolean(true)]));
  });

  it("testNbtKeys", () => {
    testFactoryType(new ValueTypeListProxyNbtKeys(new CompoundTag({})));
  });

  it("testNbtValueListByte", () => {
    const tag = new CompoundTag({
      a: new ByteArrayTag(
        new iArrayEager([new Integer(1), new Integer(2), new Integer(3)])
      ),
    });
    testFactoryType(new ValueTypeListProxyNbtValueListByte("a", tag));
  });

  it("testNbtValueListInt", () => {
    const tag = new CompoundTag({
      a: new IntArrayTag(
        new iArrayEager([new Integer(1), new Integer(2), new Integer(3)])
      ),
    });
    testFactoryType(new ValueTypeListProxyNbtValueListInt("a", tag));
  });

  it("testNbtValueListTag", () => {
    const tag = new CompoundTag({
      a: new ListTag(
        new iArrayEager([
          new IntTag(new Integer(1)),
          new IntTag(new Integer(2)),
        ])
      ),
    });
    testFactoryType(new ValueTypeListProxyNbtValueListTag("a", tag));
  });

  it("testNbtValueOperatorMapped", () => {
    const list = new ValueTypeListProxyMaterialized([new Integer(10)]);
    testFactoryType(
      new ValueTypeListProxyOperatorMapped(
        new operatorRegistry.ARITHMETIC_ADDITION() as unknown as Operator<
          Integer,
          Integer
        >,
        list
      )
    );
  });
});
